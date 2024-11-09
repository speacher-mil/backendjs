import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from '@/users/dtos/create-user.dto';
import { UsersService } from '@/users/users.service';

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
