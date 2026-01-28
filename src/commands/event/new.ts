import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import BotClient from '../../BotClient.js';
import type { SlashCommand } from "../../types/SlashCommand.js";
import CreateEventModal from "../../modals/CreateEventModal.js";

export default {
    data: new SlashCommandBuilder()
        .setName('new')
        .setDescription('Creates a new event')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option.setName('event_title')
                .setDescription('The title of the event')
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction, client: BotClient) {
        await interaction.showModal(CreateEventModal.get(interaction.options.getString('event_title', true)));
    }
} as SlashCommand
