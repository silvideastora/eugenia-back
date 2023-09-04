import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Invitation} from "../schemas/invitation";
import {CreateInvitationDto} from "../dto/create-invitation";



@Injectable()
export class InvitationsService {

    constructor(@InjectModel(Invitation.name) private invitationRepository: Model<Invitation>) {}

    async createInvitation(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
        const invitation = new this.invitationRepository(createInvitationDto);
        return invitation.save()
    }

    async findAll(): Promise<Invitation[]> {
        return this.invitationRepository.find().exec();
    }

}
