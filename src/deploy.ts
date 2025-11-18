import { REST, Routes } from "discord.js";
import BotClient from "./BotClient.js"

const deploy = async () => {
    const client = new BotClient();

    await client.loadCommands();

    const commandsData = client.commands.map(command => command.data.toJSON());

    const rest = new REST().setToken(process.env.TOKEN);

    console.log(`Started refreshing ${commandsData.length} application (/) commands`);

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commandsData },
        );
    } catch (error) {
        console.error(error);
    }
};

deploy();
