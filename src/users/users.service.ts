import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { PurposesService } from '@/purposes/purposes.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    
        private readonly purposesService: PurposesService) {}

    getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async create(userData: CreateUserDto) {
        const {email, purposes} = userData;
        const user = new User();
        user.email = email;
        purposes.forEach((purposeId) => {
            const purpose = this.purposesService.getOne(purposeId)
            user.purposes.push(purpose)
        })
        await this.usersRepository.save(user)
        return user;
    }
}
