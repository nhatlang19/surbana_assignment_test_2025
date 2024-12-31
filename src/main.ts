import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { typeOrmConfig } from './config/ormconfig';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await typeOrmConfig.initialize();

  const config = new DocumentBuilder()
    .setTitle('Location Management API')
    .setDescription('API for managing hierarchical location data')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
