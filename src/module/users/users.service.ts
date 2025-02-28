import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types/user';
import { UserAuth } from '../auth/schema/auth.shema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserAuth.name) private authModel: mongoose.Model<UserAuth>,
  ) {}

  private readonly users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
  ];

  // fetch users from db...
  async fetchUsers(): Promise<User[]> {
    // replace with actual implementation
    const users: User[] = await this.authModel.find();
    return users;
  }

  // add users to db...
  async addUser(user: User): Promise<User> {
    // replace with actual implementation
    const createdUser = await this.authModel.create(user);
    return createdUser;
  }

  // find by username...
  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }
}
