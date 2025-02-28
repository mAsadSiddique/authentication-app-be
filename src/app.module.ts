import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthService } from './module/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config/jwt-config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
