import {Controller, Post, Body, Get, Headers} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import {CreateInvitationDto} from "../dto/create-invitation";
import {Invitation} from "../schemas/invitation";
import {Public} from "../auth/decorators/public.decorators";


@Controller('invitations')
export class InvitationsController {
    constructor(private readonly invitationsService: InvitationsService) {}

    @Post()
    @Public()
    create(@Headers('authorization') authorization: string, @Body() createInvitationDto: CreateInvitationDto) {
        const token = authorization.replace('Bearer ', '');
        return this.invitationsService.createInvitation(createInvitationDto, token);
    }

    @Get()
    @Public()
    async findAll(@Headers('authorization') authorization: string): Promise<Invitation[]> {
        const token = authorization.replace('Bearer ', '');
        return this.invitationsService.findAll(token);
    }
}
