import {Body, Injectable, ValidationPipe} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Invitation} from "../schemas/invitation";
import {CreateInvitationDto} from "../dto/create-invitation";

@Injectable()
export class InvitationsService {

    constructor(
        @InjectModel(Invitation.name) private invitationRepository: Model<Invitation>
    ) {}

    async createInvitation(@Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto, email: string, qrCode: string): Promise<Invitation> {
        createInvitationDto.host = email;
        createInvitationDto.qrCode = qrCode;
        const invitation = new this.invitationRepository(createInvitationDto);
        return invitation.save()

    }

    async findAll(email: string, page: string = '1', limit: string = '100'): Promise<Invitation[]> {
        const actualPage = parseInt(page);
        const limitPerPage = parseInt(limit) ;
        const skip = (actualPage - 1) * limitPerPage;
        return this.invitationRepository.find({host: email})
            .skip(skip)
            .limit(limitPerPage)
            .sort({entryDate: -1})
            .exec();
    }

    async findById(_id: string): Promise<Invitation> {
        return this.invitationRepository.findById(_id)
    }

    async deleteInvitationById(id: string): Promise<any> {
        return this.invitationRepository.findByIdAndRemove(id)
    }
}
