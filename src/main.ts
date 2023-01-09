import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPreFix = 'api';
  app.setGlobalPrefix(globalPreFix);
  await app.listen(3000);
  Logger.log(
    `Application is running on: http://localhost:3000/${globalPreFix}`,
  );
}
bootstrap();
