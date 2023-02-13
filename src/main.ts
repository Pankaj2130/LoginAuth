import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

var cookieParser = require('cookie-parser')
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.use(cookieParser());
 
  app.enableCors();
  await app.listen(3000);

}
bootstrap();
