import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Purposes } from './entities/purposes.entity';
import { PurposesController } from './purposes.controller';
import { PurposesService } from './purposes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purposes])],
  exports: [PurposesService],
  providers: [PurposesService],
  controllers: [PurposesController],
})
export class PurposesModule {}
