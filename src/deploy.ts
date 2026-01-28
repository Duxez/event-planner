import { REST, Routes } from "discord.js";
import BotClient from "./BotClient.js"
import { env } from "./env.js";

const deploy = async () => {
    const client = new BotClient();

    await client.loadCommands();

    const commandsData = client.commands.map(command => command.data.toJSON());

    const rest = new REST().setToken(env.TOKEN);

    console.log(`Started refreshing ${commandsData.length} application (/) commands`);

    try {
        await rest.put(
            Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
            { body: commandsData },
        );
    } catch (error) {
        console.error(error);
    }
};

deploy();
