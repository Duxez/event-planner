import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js';
import { Event } from './../entities/Event.js';
export default {
    get(event: Event, interaction: ModalSubmitInteraction): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(0x9900ff)
            .setTitle(event.name)
            .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(event.description)
            .addFields(
                { name: 'Location', value: event.location || 'Not specified', inline: false },
                { name: 'Start Date', value: `<t:${Math.floor(event.startDate.getTime() / 1000)}:F>`, inline: false },
                { name: 'End Date', value: `<t:${Math.floor(event.endDate.getTime() / 1000)}:F>`, inline: true },
                { name: 'Max Participants', value: event.maxParticipants.toString(), inline: true },
            )
            .setTimestamp();
    }
}