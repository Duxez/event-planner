import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { SlashCommand } from "./types/SlashCommand.js";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { MikroORM } from "@mikro-orm/mariadb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class BotClient extends Client {
    public commands: Collection<string, SlashCommand>;
    public orm: MikroORM | null = null;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.MessageContent,
            ],
        });

        this.commands = new Collection<string, SlashCommand>();
    }

    private async _loadEvents(): Promise<void> {
        const eventsPath = path.join(__dirname, 'events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        console.log(`[Event Loader] Loading ${eventFiles.length} events...`);

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const eventModule = await import(`file://${filePath}`);
            const event = eventModule.default;

            if (event.once) {
                this.once(event.name, (...args: any[]) => event.execute(...args, this));
            } else {
                this.on(event.name, (...args: any[]) => event.execute(...args, this));
            }
        }
    }

    private async _initORM(): Promise<void> {
        this.orm = await MikroORM.init();
    }

    public async loadCommands(): Promise<void> {
        const commandsPath = path.join(__dirname, 'commands');
        const commandFolders = fs.readdirSync(commandsPath);
        console.log('[Command Loader] Loading commands...');

        for (const folder of commandFolders) {
            const folderPath = path.join(commandsPath, folder);
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file);
                const commandModule = await import(`file://${filePath}`);
                const command: SlashCommand = commandModule.default;

                if ('data' in command && 'execute' in command) {
                    this.commands.set(command.data.name, command);
                    console.log(`[Command Loader] Loaded: /${command.data.name}`);
                } else {
                    console.warn(`[WARNING] The command at ${filePath} is incomplete.`);
                }
            }
        }
    }

    public start(): void {
        console.log('Bot starting...');

        this._initORM();
        this._loadEvents();
        this.loadCommands();

        this.login(process.env.TOKEN);
    }
}

export default BotClient;
