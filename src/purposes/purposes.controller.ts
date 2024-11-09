import { Controller, Get } from '@nestjs/common';

import { Purposes } from '@/purposes/entities/purposes.entity';
import { PurposesService } from '@/purposes/purposes.service';

@Controller('purposes')
export class PurposesController {
  constructor(private readonly purposesService: PurposesService) {}

  @Get()
  async getAll(): Promise<Purposes[]> {
    return await this.purposesService.getAll();
  }
}
