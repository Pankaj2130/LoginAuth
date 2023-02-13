import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClgDocument = HydratedDocument<loginuser>;

@Schema()
export class loginuser {
    @Prop()
    id:number;
    @Prop()
    name:string;
    @Prop()
    email: string;
    @Prop()
    password: string;
  
}


export const loginuserSchema = SchemaFactory.createForClass(loginuser);
