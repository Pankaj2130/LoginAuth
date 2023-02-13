import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { loginuser } from './login.schema';

@Injectable()
export class LoginService {
  
  constructor(@InjectModel(loginuser.name) private readonly loginuserModel: Model < loginuser > ) {}
  
  async create(createLoginDto: CreateLoginDto): Promise < loginuser > {
    const employee = new this.loginuserModel(createLoginDto);
    return employee.save();
  }

  async findAll():Promise <loginuser[]> {
    return this.loginuserModel.find()
    .exec();
  }  
  // async findRegister():Promise <registeruser[]>{
  //   return this.loginuserModel.find()
  //   .exec();
  // }

  async findOne(condition: any): Promise<loginuser> {
    return this.loginuserModel.findOne(condition);
  }

  
  // constructor(@InjectModel(loginuser.name) private readonly loginuserModel: Model < loginuser > ) {}

  // async create(createLoginuserDto: CreateLoginDto): Promise < loginuser > {
  //   const employee = new this.loginuserModel(createLoginuserDto);
  //   return employee.save();
  // }

//   async create(data: any): Promise<User> {
//     return this.userRepository.save(data);
// }

// async findOne(condition: any): Promise<loginuser> {
//     return this.loginuserModel.findOne(condition);
// }
}
