import { ActivityType, Events } from "discord.js";
import type BotClient from "../BotClient.js";

export default {
    name: Events.ClientReady,
    once: true,

    execute(client: BotClient) {
        if (!client.user) {
            console.error('Client user is not defined!');
            return;
        }

        console.log(`Ready! Logged in as ${client.user.tag}`);
        console.log(`Loaded ${client.commands.size} slash commands`);

        client.user.setActivity('Planning new events', { type: ActivityType.Custom, state: '📅' });
    }
}
