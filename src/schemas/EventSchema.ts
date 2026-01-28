import { z } from "zod";

export default {
    getSchema() {
        return z.object({
            numberOfAttendees: z.coerce.number("Not an valid whole number").int().min(1, "There must be at least 1 attendee"),
            eventDate: z.coerce.date("The combination of date and time is not valid").min(new Date(), "Event date must be in the future"),
            eventDuration: z.coerce.number("Not an valid whole number").int().min(1, "Event duration must be at least 1"),
            eventDescription: z.string().min(1, "Event description cannot be empty"),
            location: z.string().min(1, "Event location cannot be empty"),
        });
    }
}