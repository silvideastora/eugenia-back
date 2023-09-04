// invitations.controller.ts
import {Controller, Post, Body, Get} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import {CreateInvitationDto} from "../dto/create-invitation";
import {Invitation} from "../schemas/invitation";
import {Public} from "../auth/decorators/public.decorators";


@Controller('invitations')
export class InvitationsController {
    constructor(private readonly invitationsService: InvitationsService) {}

    @Post()
    @Public()
    create(@Body() createInvitationDto: CreateInvitationDto) {
        return this.invitationsService.createInvitation(createInvitationDto);
    }

    @Get()
    @Public()
    async findAll(): Promise<Invitation[]> {
        return this.invitationsService.findAll();
    }
}
