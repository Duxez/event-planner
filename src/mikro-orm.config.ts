import { MariaDbDriver, type Options } from "@mikro-orm/mariadb";

const config: Options = {
    driver: MariaDbDriver,
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['dist/entities/*.js'],
    entitiesTs: ['src/entities/*.ts'],
};

export default config;
