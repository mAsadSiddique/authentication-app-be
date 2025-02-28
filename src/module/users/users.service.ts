import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
  ];

  // fetch users from db...
  fetchUsers(): User[] {
    // replace with actual implementation
    return [];
  }

  // find by username...
  async findByUsername(username: string): Promise<User | undefined> {
    console.log('objects found: ' + username);
    return this.users.find((user) => user.name === username);
  }
}
