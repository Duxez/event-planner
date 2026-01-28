import { Migration } from '@mikro-orm/migrations';

export class Migration20260108184249 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`event\` (\`uuid\` text not null, \`name\` text not null, \`description\` text not null, \`start_date\` datetime not null, \`end_date\` datetime not null, \`location\` text not null, \`max_participants\` integer not null, \`discord_message_id\` bigint not null, primary key (\`uuid\`));`);

    this.addSql(`create table \`kitchen_table_user\` (\`uuid\` text not null, \`discord_id\` bigint null, \`name\` text null, primary key (\`uuid\`));`);

    this.addSql(`create table \`event_user\` (\`user_uuid\` text not null, \`event_uuid\` text not null, \`accepted\` datetime null, \`declined\` datetime null, \`wait_list\` integer not null default false, \`checked_in\` datetime null, constraint \`event_user_user_uuid_foreign\` foreign key(\`user_uuid\`) references \`kitchen_table_user\`(\`uuid\`) on update cascade, constraint \`event_user_event_uuid_foreign\` foreign key(\`event_uuid\`) references \`event\`(\`uuid\`) on update cascade, primary key (\`user_uuid\`, \`event_uuid\`));`);
    this.addSql(`create index \`event_user_user_uuid_index\` on \`event_user\` (\`user_uuid\`);`);
    this.addSql(`create index \`event_user_event_uuid_index\` on \`event_user\` (\`event_uuid\`);`);
  }

}
