import { createClient } from '@libsql/client';
import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/libsql';

import { DrizzleSqliteConfig } from './drizzle.sqlite.interface';

@Injectable()
export class DrizzleSqliteService {
  public async getDB(options: DrizzleSqliteConfig) {
    return drizzle(createClient(options.config), options?.drizzleConfig ?? {});
  }
}
