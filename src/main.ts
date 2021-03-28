import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const { PORT, HOST } = process.env;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    logger.log(`Project is running on ${HOST}:${PORT}`);
  });}
bootstrap();
