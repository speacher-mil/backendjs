import { Controller, Get, Post } from '@nestjs/common';
import { PurposesService } from './purposes.service';
import { Purposes } from './entities/purposes.entity';

@Controller('purposes')
export class PurposesController {
    constructor(private readonly purposesService : PurposesService) {}

    @Get()
    async getAll(): Promise<Purposes[]> {
        return await this.purposesService.getAll();
    }

}
