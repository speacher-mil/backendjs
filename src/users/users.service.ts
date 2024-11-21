import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PurposesService } from '@/users/purposes/purposes.service';
import { CreateUserDto } from '@/users/dtos/create-user.dto';
import { User } from '@/users/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly purposesService: PurposesService,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(userData: CreateUserDto) {
    const { email, purposes } = userData;
    const user = new User();
    user.email = email;
    const purposeList = await Promise.all(
      purposes.map(async (purposeId) => {
        return await this.purposesService.getOne(purposeId);
      }),
    );
    user.purposes = purposeList;
    await this.usersRepository.save(user);

    return user;
  }
}
