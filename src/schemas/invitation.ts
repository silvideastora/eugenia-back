import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Invitation {
    @Prop()
    id: number;

    @Prop()
    guestName: string;

    @Prop()
    entryDate: Date;

    @Prop()
    expirationDate: Date;

    @Prop()
    host: string

    @Prop()
    qrCode: string

    @Prop()
    apartment: number
}

export type InvitationDocument = Invitation & Document;
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
