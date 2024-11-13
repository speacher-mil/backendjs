import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { config } from '@/config';
import { Purposes } from '@/purposes/entities/purposes.entity';
import { PurposesModule } from '@/purposes/purposes.module';
import { User } from '@/users/entities/users.entity';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.MYSQL_HOST,
      port: 3306,
      username: config.MYSQL_USERNAME,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
      entities: [User, Purposes],
      synchronize: true,
    }),
    UsersModule,
    PurposesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
