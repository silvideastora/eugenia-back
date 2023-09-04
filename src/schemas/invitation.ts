import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Invitation {
    @Prop()
    id: number;

    @Prop()
    guestName: string;

    @Prop()
    entryDate: string;

    @Prop()
    expirationDate: string;
}

export type InvitationDocument = Invitation & Document;
export const InvitationSchema = SchemaFactory.createForClass(Invitation);
