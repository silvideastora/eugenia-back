import {Body, Injectable, UnauthorizedException, ValidationPipe, Res} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Invitation} from "../schemas/invitation";
import {CreateInvitationDto} from "../dto/create-invitation";
import {JwtService} from "@nestjs/jwt";
import {QrCodeService} from "../qr-code/qr-code.service";



@Injectable()
export class InvitationsService {

    constructor(
        @InjectModel(Invitation.name) private invitationRepository: Model<Invitation>,
        private jwtService: JwtService
    ) {}

    async createInvitation(@Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto, email: string, qrCode: string): Promise<Invitation> {
        createInvitationDto.host = email;
        createInvitationDto.qrCode = qrCode;
        const invitation = new this.invitationRepository(createInvitationDto);
        return invitation.save()

    }

    async findAll(email: string): Promise<Invitation[]> {
        return this.invitationRepository.find({host: email}).exec();
    }

}
