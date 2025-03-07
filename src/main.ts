import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin : ['*'],
    methods: ['Get','POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'origin'],
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
