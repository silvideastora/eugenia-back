// create-invitation.dto.ts
import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateInvitationDto {
    @IsString()
    @IsNotEmpty()
    guestName: string;

    @IsDate()
    entryDate: Date;

    @IsDate()
    expirationDate: Date;
}
