import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { FormatResponseInterceptor } from './interceptor/format-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.use(cookieParser());
  app.enableCors({ origin: ['http://ldt.ldt:3000'], credentials: true });

  await app.listen(3000);
}
bootstrap();
