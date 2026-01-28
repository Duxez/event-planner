import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: SqliteDriver,
  dbName: 'sqlite.db',
  entities: ['dist/entities/*.js'],
  entitiesTs: ['src/entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;