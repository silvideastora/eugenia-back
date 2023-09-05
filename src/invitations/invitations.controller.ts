import {Controller, Post, Body, Get, Headers, Res, UnauthorizedException, Query} from '@nestjs/common';
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
    async create(@Headers('authorization') authorization: string, @Body() createInvitationDto: CreateInvitationDto) {
        const token = authorization.replace('Bearer ', '');
        try {
            const info = this.jwtService.verify(token);
            const qrCode = await this.qrCodeService.generateQRCode(JSON.stringify(createInvitationDto))
            const invitation = await this.invitationsService.createInvitation(createInvitationDto, info.email, qrCode);
            return {
                qrCode,
                entryDate: invitation.entryDate,
                expirationDate: invitation.expirationDate,
                guestName: invitation.guestName,
                host: invitation.host
            }
        } catch {
            throw new UnauthorizedException();
        }
    }

    @Get()
    async findAll(@Headers('authorization') authorization: string, @Query() pagination: Record<string, string>): Promise<Invitation[]> {
        const token = authorization.replace('Bearer ', '');
        try {
            const info = this.jwtService.verify(token);
            return this.invitationsService.findAll(info.email, pagination?.page, pagination?.size);
        }  catch {
            throw new UnauthorizedException();
        }
    }
}
