import { KitchenTableUser } from './KitchenTableUser.js';
import { BooleanType, DateTimeType, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class EventUser {
    @ManyToOne(() => KitchenTableUser, { primary: true })
    user!: KitchenTableUser;

    @ManyToOne(() => Event, { primary: true })
    event!: Event;

    @Property({ nullable: true, type: DateTimeType })
    accepted: Date|null = null;

    @Property({ nullable: true, type: DateTimeType })
    declined: Date|null = null;

    @Property({ type: BooleanType })
    waitList: boolean = false;

    @Property({ type: DateTimeType, nullable: true })
    checkedIn: Date|null = null;
}