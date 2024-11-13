import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Purposes } from '@/purposes/entities/purposes.entity';
import { PurposesController } from '@/purposes/purposes.controller';
import { PurposesService } from '@/purposes/purposes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purposes])],
  exports: [PurposesService],
  providers: [PurposesService],
  controllers: [PurposesController],
})
export class PurposesModule {}
