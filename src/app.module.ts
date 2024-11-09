import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';

import { Purposes } from './purposes/entities/purposes.entity';
import { PurposesModule } from './purposes/purposes.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-2.chqgag6igsdg.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'djqandyd2024!',
      database: 'speacherdb',
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
