import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/AppModule';
import { config } from '@/utils/config';

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
})();
