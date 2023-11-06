import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { LoggerFactory } from './logger/loggerFactory';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyCustomExceptionFilter } from './error-handler/error-handler';

async function start() {
  const config1 = new DocumentBuilder()
    .setTitle('Electron Library')
    .setDescription('Finish exam backend')
    .setVersion('1.0.0')
    .addTag(' NestJS, Postgres, TypeOrm')
    .build();
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('Electron Library'),
  });
  const document = SwaggerModule.createDocument(app, config1);
  SwaggerModule.setup('/docs', app, document);

  const config = app.get(ConfigService);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MyCustomExceptionFilter());

  const PORT = config.get<number>('API_PORT');
  await app.listen(PORT || 3000, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
  });
}
start();
