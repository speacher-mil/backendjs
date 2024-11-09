import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Global,
  Inject,
} from '@nestjs/common';

import { DrizzleSqliteConfig } from './drizzle.sqlite.interface';
import { DrizzleSqliteService } from './drizzle.sqlite.service';

const DRIZZLE_SQLITE = Symbol('DRIZZLE_SQLITE');

const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<DrizzleSqliteConfig>()
  .setExtras({ tag: DRIZZLE_SQLITE }, (definition, extras) => ({
    ...definition,
    tag: extras.tag,
  }))
  .build();

@Global()
export class DrizzleSqliteModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleSqliteService,
        {
          provide: options?.tag || DRIZZLE_SQLITE,
          useFactory: async (drizzleService: DrizzleSqliteService) => {
            return await drizzleService.getDB(options);
          },
          inject: [DrizzleSqliteService],
        },
      ],
      exports: [...exports, options?.tag || DRIZZLE_SQLITE],
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const {
      providers = [],
      exports = [],
      ...props
    } = super.registerAsync(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleSqliteService,
        {
          provide: options?.tag || DRIZZLE_SQLITE,
          useFactory: async (
            drizzleService: DrizzleSqliteService,
            config: DrizzleSqliteConfig,
          ) => {
            return await drizzleService.getDB(config);
          },
          inject: [DrizzleSqliteService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || DRIZZLE_SQLITE],
    };
  }
}

export const InjectDrizzleSqlite = (configTag = DRIZZLE_SQLITE) => {
  return Inject(configTag);
};
