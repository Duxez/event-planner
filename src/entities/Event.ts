import { BigIntType, Cascade, Collection, DateTimeType, Entity, OneToMany, PrimaryKey, Property, UuidType } from '@mikro-orm/core';
import { v7 as uuid } from 'uuid';
import { EventUser } from './EventUser.js';

@Entity()
export class Event {
    @PrimaryKey({ type: UuidType })
    uuid: string = uuid();

    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property({ type: DateTimeType })
    startDate!: Date;

    @Property({ type: DateTimeType })
    endDate!: Date;

    @Property()
    location!: string;

    @Property()
    maxParticipants!: number;

    @Property({ type: BigIntType })
    discordMessageId!: bigint;

    @OneToMany(() => EventUser, eventUser => eventUser.event, { cascade: [ Cascade.ALL ] })
    participants = new Collection<EventUser>(this);
}