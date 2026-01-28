import { Events, LabelBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { id } from "zod/v4/locales";

export default {
    id: 'createEventModal',
    inputIds: {
        numberOfAttendees: 'numberOfAttendees',
        eventDate: 'eventDate',
        eventDuration: 'eventDuration',
        eventDescription: 'eventDescription',
        location: 'location',
    },
    get(title: string): ModalBuilder {
        const modal = new ModalBuilder()
            .setCustomId(`create_${title.replaceAll(' ', '_').toLowerCase()}`)
            .setTitle(title);

        const numberOfAttendeesInput = new TextInputBuilder()
            .setCustomId(this.inputIds.numberOfAttendees)
            .setStyle(TextInputStyle.Short);
        const numberOfAttendeesLabel = new LabelBuilder()
            .setLabel('Number of attendees')
            .setDescription('Enter the expected number of attendees for the event')
            .setTextInputComponent(numberOfAttendeesInput);

        const dateInput = new TextInputBuilder()
            .setCustomId(this.inputIds.eventDate)
            .setStyle(TextInputStyle.Short);
        const dateLabel = new LabelBuilder()
            .setLabel('Event date and time')
            .setDescription('Enter the date and time of the event (e.g., YYYY-MM-DD HH:MM)')
            .setTextInputComponent(dateInput);

        const durationInput = new TextInputBuilder()
            .setCustomId(this.inputIds.eventDuration)
            .setStyle(TextInputStyle.Short);
        const durationLabel = new LabelBuilder()
            .setLabel('Event duration in minutes')
            .setDescription('Enter the duration of the event (e.g., 240 for 4 hours)')
            .setTextInputComponent(durationInput);

        const locationInput = new TextInputBuilder()
            .setCustomId(this.inputIds.location)
            .setStyle(TextInputStyle.Short);
        const locationLabel = new LabelBuilder()
            .setLabel('Event location')
            .setDescription('Provide the location of the event')
            .setTextInputComponent(locationInput);

        const descriptionInput = new TextInputBuilder()
            .setCustomId(this.inputIds.eventDescription)
            .setStyle(TextInputStyle.Paragraph);
        const descriptionLabel = new LabelBuilder()
            .setLabel('Event description')
            .setDescription('Provide a description of the event')
            .setTextInputComponent(descriptionInput);
        
        modal.addLabelComponents(
            numberOfAttendeesLabel,
            dateLabel,
            durationLabel,
            locationLabel,
            descriptionLabel,
        );

        return modal;
    }
}
