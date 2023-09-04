import {Body, Injectable, ValidationPipe} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Invitation} from "../schemas/invitation";
import {CreateInvitationDto} from "../dto/create-invitation";
import {JwtService} from "@nestjs/jwt";



@Injectable()
export class InvitationsService {

    constructor(
        @InjectModel(Invitation.name) private invitationRepository: Model<Invitation>,
        private jwtService: JwtService
    ) {}

    async createInvitation(@Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto, token: string): Promise<Invitation> {
        const email = this.jwtService.verify(token);
        createInvitationDto.host = email.email;
        const invitation = new this.invitationRepository(createInvitationDto);
        return invitation.save()
    }

    async findAll(token: string): Promise<Invitation[]> {
        const email = this.jwtService.verify(token);
        console.log(email.email)
        return this.invitationRepository.find({host: email.email}).exec();
    }

}
