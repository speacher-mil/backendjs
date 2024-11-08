import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PurposesModule } from '@/purposes/purposes.module';
import { PurposesService } from '@/purposes/purposes.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), PurposesModule],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
