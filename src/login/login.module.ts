import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { loginuser, loginuserSchema } from './login.schema';

@Module({
  imports: [

    MongooseModule.forFeature([
      {
        name: loginuser.name,
        schema: loginuserSchema,
      }
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
  })
],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
