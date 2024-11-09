import { Controller, Get, Post } from '@nestjs/common';

import { Purposes } from './entities/purposes.entity';
import { PurposesService } from './purposes.service';

@Controller('purposes')
export class PurposesController {
  constructor(private readonly purposesService: PurposesService) {}

  @Get()
  async getAll(): Promise<Purposes[]> {
    return await this.purposesService.getAll();
  }
}
