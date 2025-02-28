import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  // injecting the auth service...
  constructor(private jwtService: JwtService) {}

  // validating the auth service...
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers['authorization'];
    const token = authorization?.split(' ')[1];

    // if token not found...
    if (!token) {
      throw new UnauthorizedException(`Invalid authorization`);
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      console.log('tokenPayload: ', tokenPayload);

      request.user = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Invalid authorization`);
    }
  }
}
