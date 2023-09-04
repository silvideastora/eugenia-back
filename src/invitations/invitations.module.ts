import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Invitation, InvitationSchema} from "../schemas/invitation";

@Module({
  providers: [InvitationsService],
  controllers: [InvitationsController],
  imports: [
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
  ],
})
export class InvitationsModule {}
