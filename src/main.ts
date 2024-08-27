import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from '@/AppModule';
import { IS_PRODUCTION, config } from '@/config';
import { AllExceptionsFilter } from '@/shared/filters/AllExceptionsFilter';
import { HttpLoggingInterceptor } from '@/shared/interceptors/HttpLoggingInterceptor';

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
  process.env.TZ = 'Asia/Seoul';

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpLoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  !IS_PRODUCTION && setupSwaggerDocument(app);

  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors({
    origin: ['http://localhost'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.listen(config.PORT);
})();
