import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sessions from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    sessions({
      secret: 'keyword cat',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3005);
}
bootstrap();
