import {Controller, Post, Body, Get, Headers, Res, UnauthorizedException} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import {CreateInvitationDto} from "../dto/create-invitation";
import {Invitation} from "../schemas/invitation";
import {QrCodeService} from "../qr-code/qr-code.service";
import { Response } from 'express';
import {JwtService} from "@nestjs/jwt";

@Controller('invitations')
export class InvitationsController {
    constructor(
        private readonly invitationsService: InvitationsService,
        private qrCodeService: QrCodeService,
        private jwtService: JwtService
    ) {}

    @Post()
    async create(@Headers('authorization') authorization: string, @Body() createInvitationDto: CreateInvitationDto,  @Res() res: Response) {
        const token = authorization.replace('Bearer ', '');
        try {
            const info = this.jwtService.verify(token);
            const qrCode = await this.qrCodeService.generateQRCode(JSON.stringify(createInvitationDto))
            await this.invitationsService.createInvitation(createInvitationDto, info.email, qrCode);
            res.set('Content-Type', 'image/png');
            res.send(qrCode);
        } catch {
            throw new UnauthorizedException();
        }
    }

    @Get()
    async findAll(@Headers('authorization') authorization: string): Promise<Invitation[]> {
        const token = authorization.replace('Bearer ', '');
        try {
            const info = this.jwtService.verify(token);
            return this.invitationsService.findAll(info.email);
        }  catch {
            throw new UnauthorizedException();
        }
    }
}
