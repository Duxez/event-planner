declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            CLIENT_ID: string;
            GUILD_ID: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_HOST: string;
        }
    }
}

export { };
