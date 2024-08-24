import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from '@/AppModule';
import { IS_PRODUCTION, config } from '@/utils/config';

const setupSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('1.0.0')
    .addTag('Misc', 'Miscellaneous APIs')
    .build();

  const options: SwaggerCustomOptions = {};

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, options);
};

(async () => {
  const app = await NestFactory.create(AppModule);
  !IS_PRODUCTION && setupSwaggerDocument(app);

  await app.listen(config.PORT);
})();