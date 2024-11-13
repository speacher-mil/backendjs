import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Global,
  Inject,
} from '@nestjs/common';

import { DrizzleMySqlConfig } from './drizzle.mysql.interface';
import { DrizzleMySqlService } from './drizzle.mysql.service';

export const DRIZZLE_MYSQL = Symbol('DIRZZLE_MYSQL');

const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<DrizzleMySqlConfig>()
  .setExtras({ tag: DRIZZLE_MYSQL }, (definition, extras) => ({
    ...definition,
    tag: extras.tag,
  }))
  .build();

@Global()
export class DrizzleMySqlModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const { providers = [], exports = [], ...props } = super.register(options);
    return {
      ...props,
      providers: [
        ...providers,
        DrizzleMySqlService,
        {
          provide: options?.tag || DRIZZLE_MYSQL,
          useFactory: async (drizzleService: DrizzleMySqlService) => {
            return await drizzleService.getDrizzle(options);
          },
          inject: [DrizzleMySqlService],
        },
      ],
      exports: [...exports, options?.tag || DRIZZLE_MYSQL],
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
        DrizzleMySqlService,
        {
          provide: options?.tag || DRIZZLE_MYSQL,
          useFactory: async (
            drizzleService: DrizzleMySqlService,
            config: DrizzleMySqlConfig,
          ) => {
            return await drizzleService.getDrizzle(config);
          },
          inject: [DrizzleMySqlService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, options?.tag || DRIZZLE_MYSQL],
    };
  }
}

export const InjectMySql = (configTag = DRIZZLE_MYSQL) => {
  return Inject(configTag);
};
