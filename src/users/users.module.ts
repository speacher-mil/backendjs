import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurposesModule } from '@/purposes/purposes.module';
import { PurposesService } from '@/purposes/purposes.service';

import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PurposesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
