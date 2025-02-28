import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './module/auth/local-auth.guard';
import { AuthenticationGuard } from './module/auth/authenticated.guard';
import { AuthService } from './module/auth/auth.service';
import { UserLogin } from './utils/types/user';
import { AuthGuard } from './module/auth/Guard/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  hello() {
    return this.appService.getHello();
  }

  // post login action...
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() input: UserLogin): any {
    return this.authService.authenticateUser(input);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUserInfo(@Request() req): string {
    console.log('req', req);
    return req?.user;
  }
}
