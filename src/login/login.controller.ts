import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, Req, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {Response, Request} from 'express';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService, private jwtService: JwtService) {}
  @Post('register')
  async register(
      @Body('name', new ValidationPipe()) name: string,
      @Body('email', new ValidationPipe()) email: string,
      @Body('password', new ValidationPipe()) password: string
  ) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await this.loginService.create({
        name,
        email,
        password: hashedPassword,
        
      });

      delete user.password;

      return user;


      
  }

  @Post('login')
  async login(
      @Body('email',new ValidationPipe()) email: string,
      @Body('password',new ValidationPipe()) password: string,
      @Res({passthrough: true}) response: Response
  ) {
      const user = await this.loginService.findOne({email});

      if (!user) {
          throw new BadRequestException('invalid email');
      }

      if (!await bcrypt.compare(password, user.password)) {
          throw new BadRequestException('invalid password ');
      }

      const jwt = await this.jwtService.signAsync({id: user.id});

      response.cookie('jwt', jwt, {httpOnly: true});

      return "jwt:"+jwt;
  }

  @Get('user')
  async user(@Req() request: Request) {
      try {
          const cookie = request.cookies['jwt'];

          const data = await this.jwtService.verifyAsync(cookie);

          if (!data) {
              throw new UnauthorizedException();
          }

          const user = await this.loginService.findOne({id: data['id']});

          const {password, ...result} = user;

          return result;
      } catch (e) {
          throw new UnauthorizedException();
      }
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
      response.clearCookie('jwt');

      return {
          message: 'Logout success!'
      }
  }
}
