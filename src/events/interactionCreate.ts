import { Events, type Interaction } from "discord.js";
import type BotClient from "../BotClient.js";

export default {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction: Interaction, client: BotClient) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            const replyOptions = {
                content: 'There was an error while executing this command!',
                ephemeral: true,
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(replyOptions);
            } else {
                await interaction.reply(replyOptions);
            }
        }
    },
}
