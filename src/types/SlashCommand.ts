import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type BotClient from '../BotClient.js';

export interface SlashCommand {
    data: SlashCommandBuilder;

    execute: (
        interaction: ChatInputCommandInteraction,
        client: BotClient,
    ) => Promise<void>;
}
