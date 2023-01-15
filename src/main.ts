import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPreFix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPreFix);
  await app.listen(3000);
  Logger.log(
    `Application is running on: http://localhost:3000/${globalPreFix}`,
  );
}
bootstrap();
