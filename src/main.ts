import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieparser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieparser())
  app.enableCors({credentials: true, origin: 'http://localhost:3000'})
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(8000);
}
bootstrap();
