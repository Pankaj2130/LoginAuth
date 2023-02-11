import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto {
    // id:number;
    @IsString()
    name: string;
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
