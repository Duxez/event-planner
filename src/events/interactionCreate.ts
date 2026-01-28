import { Events, type Interaction } from "discord.js";
import type BotClient from "../BotClient.js";
import CreateEventModal from "../modals/CreateEventModal.js";
import CreateEventHandler from "../handlers/CreateEventHandler.js";

export default {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction: Interaction, client: BotClient) {
        if (!interaction.isChatInputCommand()) {
            this.handleModal(interaction, client);
            return;
        }

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

    async handleModal(interaction: Interaction, client: BotClient) {
        if (!interaction.isModalSubmit()) return;

        const modalId = interaction.customId;

        switch (modalId.split('_')[0]) {
            case 'create':
                CreateEventHandler.handle(interaction);
                break;
        }
    }
}
