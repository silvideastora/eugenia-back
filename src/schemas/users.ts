import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    name: string;

    @Prop()
    apartmentNumber: number
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
