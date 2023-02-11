import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Ritesh:B8wxSrrcaOa8W1cZ@cluster0.k6xufpn.mongodb.net/?retryWrites=true&w=majority'), LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
