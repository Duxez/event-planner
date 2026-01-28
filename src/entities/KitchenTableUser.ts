import { BigIntType, Cascade, Collection, Entity, OneToMany, PrimaryKey, Property, UuidType } from "@mikro-orm/core";
import { v7 as uuid } from "uuid";
import { EventUser } from "./EventUser.js";

@Entity()
export class KitchenTableUser {
    @PrimaryKey({ type: UuidType })
    uuid: string = uuid();

    @Property({ type: BigIntType, nullable: true })
    discordId: bigint|null = null;

    @Property({ type: 'string', nullable: true })
    name: string|null = null;

    @OneToMany(() => EventUser, eventUser => eventUser.user, { cascade: [ Cascade.ALL ] })
    events = new Collection<EventUser>(this);
}