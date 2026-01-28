import { ModalSubmitInteraction } from "discord.js";
import CreateEventModal from "../modals/CreateEventModal.js";
import EventSchema from "../schemas/EventSchema.js";
import { Event } from "../entities/Event.js";
import { v7 as uuidv7 } from "uuid";
import EventEmbed from "../embeds/EventEmbed.js";

function isDST(date: Date): boolean {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Amsterdam',
        timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(date);
    const tzName = parts.find(part => part.type === 'timeZoneName')?.value;
    return tzName === 'GMT+2' || tzName === 'CEST';
}

export default {
    async handle(interaction: ModalSubmitInteraction) {
        await interaction.deferReply({ ephemeral: false });
        console.log(interaction.fields);
        let dateString = interaction.fields.getTextInputValue(CreateEventModal.inputIds.eventDate).replace(' ', 'T');
        if (isDST(new Date(dateString))) {
            dateString += '+02:00';
        } else {
            dateString += '+01:00';
        }
        const modalData = {
            numberOfAttendees: interaction.fields.getTextInputValue(CreateEventModal.inputIds.numberOfAttendees),
            eventDate: Date.parse(dateString),
            eventDuration: interaction.fields.getTextInputValue(CreateEventModal.inputIds.eventDuration),
            eventDescription: interaction.fields.getTextInputValue(CreateEventModal.inputIds.eventDescription),
            location: interaction.fields.getTextInputValue(CreateEventModal.inputIds.location),
        }
            
        const parsed = EventSchema.getSchema().safeParse(modalData);
            
        if (!parsed.success) {
            let message = '';
            for (const issue of parsed.error.issues) {
                message += `- ${issue.message}\n`;
            }

            interaction.followUp({
                content: `There were some problems with the data you provided:\n${message}`,
            });
            return;
        }

        const event = new Event();
        event.maxParticipants = parsed.data.numberOfAttendees;
        event.startDate = new Date(parsed.data.eventDate.toUTCString());
        // Adjust endDate based on duration in minutes
        event.endDate = new Date(event.startDate.getTime() + parsed.data.eventDuration * 60000);
        event.description = parsed.data.eventDescription;
        event.name = interaction.customId.split('_').slice(1).join(' ');
        event.location = parsed.data.location;
        event.uuid = uuidv7();

        const response = await interaction.followUp({ embeds: [EventEmbed.get(event, interaction)] });

        event.discordMessageId = BigInt(response.id);
    }
}
