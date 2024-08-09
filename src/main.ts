import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { applyGlobalConfig } from './nest-modules/global-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applyGlobalConfig(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(3000);
}
bootstrap();
