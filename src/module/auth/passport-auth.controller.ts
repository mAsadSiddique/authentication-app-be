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
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './Guard/passport-local.gurad';
import { PassportJwtAuthGuard } from './Guard/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() request) {
    return this.authService.signInUser(request?.user);
  }

  @Get('user')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() req): any {
    console.log('req', req);
    return { data: req?.user };
  }
}
