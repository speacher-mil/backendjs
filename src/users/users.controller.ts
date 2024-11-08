import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(readonly usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Post()
    create(@Body() userData: CreateUserDto) {
      return this.usersService.create(userData);
    }
}
