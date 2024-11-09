import { Config } from '@libsql/client';
import { DrizzleConfig } from 'drizzle-orm';

export interface DrizzleSqliteConfig {
  config: Config;
  drizzleConfig?: DrizzleConfig<any> | undefined;
}
