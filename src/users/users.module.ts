import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurposesModule } from '@/purposes/purposes.module';
import { User } from '@/users/entities/users.entity';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PurposesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
