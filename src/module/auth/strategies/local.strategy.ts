import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'userName', passwordField: 'password' }); // configuration....
  }

  async validate(userName: string, password: string): Promise<any> {
    console.log('object validation');
    const user = await this.authService.ValidateUser(userName, password);
    console.log('user validation: ', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
