import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop({
        unique:true,
        index:true,
    })
    email: string;

    @Prop({
        index:true,
        select: false,
    })
    password: string;
    
    @Prop({
        index:true,
    })
    fullname: string;
    
    @Prop({
        index:true,
    })
    isActive: boolean;
    
    @Prop({
        index:true,
    })
    rol: string[];
}

export const UserSchema = SchemaFactory.createForClass( User );