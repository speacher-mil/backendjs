import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Purposes } from '@/users/purposes/entities/purposes.entity';
import { PurposesController } from '@/users/purposes/purposes.controller';
import { PurposesService } from '@/users/purposes/purposes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purposes])],
  exports: [PurposesService],
  providers: [PurposesService],
  controllers: [PurposesController],
})
export class PurposesModule {}
