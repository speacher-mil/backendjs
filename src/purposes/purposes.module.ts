import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurposesService } from './purposes.service';
import { PurposesController } from './purposes.controller';
import { Purposes } from './entities/purposes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Purposes])],
    exports: [PurposesService],
    providers: [PurposesService],
    controllers: [PurposesController],
})
export class PurposesModule {}
