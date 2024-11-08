import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purposes } from './entities/purposes.entity';

@Injectable()
export class PurposesService {
    constructor(
    @InjectRepository(Purposes)
    private readonly purposesRepository: Repository<Purposes>) {}

    async getAll(): Promise<Purposes[]> {
        return await this.purposesRepository.find();
    }

    async getOne(id): Promise<Purposes> {
        return await this.purposesRepository.findOne(id);
    }
}
