import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // Should be updated for production use
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Toy Robot Simulator example')
    .setDescription(
      'The Toy Robot Simulator API is a simple API to track user movements on a grid.',
    )
    .setVersion('1.0')
    .addTag('movements')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
