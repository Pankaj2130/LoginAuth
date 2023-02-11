import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateLoginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {
    // id:number;
    @IsString()
    name: string;
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
