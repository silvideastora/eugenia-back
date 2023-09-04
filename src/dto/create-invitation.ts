// create-invitation.dto.ts
import {IsString, IsNotEmpty, IsDateString} from 'class-validator';

export class CreateInvitationDto {
    @IsString()
    @IsNotEmpty()
    guestName: string;

    @IsNotEmpty({ message: 'La fecha del evento es obligatoria' })
    @IsDateString()
    entryDate: Date;

    @IsDateString()
    @IsNotEmpty({ message: 'La fecha de caducidad del evento es obligatoria' })
    expirationDate: Date;

    host: string
}
