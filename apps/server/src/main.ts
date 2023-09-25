import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();

  const origins: string[] = environment.production
    ? ['https://www.simulado.gratis', 'https://admin.simulado.gratis']
    : ['http://localhost:4200'];

  app.enableCors({
    allowedHeaders: '*',
    origin: origins,
    credentials: true,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
