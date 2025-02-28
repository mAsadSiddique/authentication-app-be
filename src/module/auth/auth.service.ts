import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthResult, User, UserLogin } from 'src/utils/types/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(userDetails: UserLogin): Promise<AuthResult> {
    const user = await this.ValidateUser(
      userDetails?.userName,
      userDetails.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signInUser(user);
  }

  async ValidateUser(
    userName: string,
    password: string,
  ): Promise<any | undefined> {
    const user = await this.userService.findByUsername(userName);
    console.log('user validation: ', user);
    if (user && user?.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signInUser(user: User): Promise<any> {
    const tokenPayload = {
      sub: user.id,
      username: user.name,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      username: user.name,
      userId: user.id,
    };
  }
}
