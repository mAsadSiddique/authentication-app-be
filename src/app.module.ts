import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthService } from './module/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/jwt-config';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './module/auth/passport-auth.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, PassportAuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
