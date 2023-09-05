import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Invitation, InvitationSchema} from "../schemas/invitation";
import {QrCodeModule} from "../qr-code/qr-code.module";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [InvitationsService],
  controllers: [InvitationsController],
  imports: [
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
    QrCodeModule,
      UsersModule
  ],
})
export class InvitationsModule {}
