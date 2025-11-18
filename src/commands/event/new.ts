import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import BotClient from '../../BotClient.js';
import type { SlashCommand } from "../../types/SlashCommand.js";

export default {
    data: new SlashCommandBuilder()
        .setName('new')
        .setDescription('Creates a new event')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction, client: BotClient) {
        await interaction.reply('The command works');
    }
} as SlashCommand
