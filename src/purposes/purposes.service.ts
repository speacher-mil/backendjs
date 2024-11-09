import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Purposes } from '@/purposes/entities/purposes.entity';

@Injectable()
export class PurposesService {
  constructor(
    @InjectRepository(Purposes)
    private readonly purposesRepository: Repository<Purposes>,
  ) {}

  async getAll(): Promise<Purposes[]> {
    return await this.purposesRepository.find();
  }

  getOne(id: Number): Promise<Purposes | null> {
    return this.purposesRepository.findOneBy({ id: id });
  }
}
