import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/utils/types/user';
import { UsersService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    // fetch users from db...
    return await this.userService.fetchUsers();
  }

  @Post('add')
  async create(@Body() user): Promise<User> {
    const result = await this.userService.addUser(user);
    return result;
  }
}
