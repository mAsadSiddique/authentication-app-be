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
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './module/users/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGOOES_DB_URL),
    UsersModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, UserController, PassportAuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
