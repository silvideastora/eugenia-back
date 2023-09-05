import {
    Body,
    Controller,
    HttpCode, HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {Public} from "./decorators/public.decorators";
import {UsersService} from "../users/users.service";
import {EmailService} from "../email/email.service";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly userService: UsersService,
        private readonly emailService: EmailService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() signInDto: Record<string, string>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Post('forgot-password')
    async requestPasswordReset(@Body() body: { email: string }) {
        const user = await this.userService.findByEmail(body.email);
        if (!user) {
            throw new HttpException(
                'Usuario no encontrado',
                HttpStatus.BAD_REQUEST
            );
        }
        const resetToken = await this.userService.generatePasswordResetToken();
        await this.userService.updatePassword(user.email, resetToken);
        const emailSubject = 'Recuperación de contraseña';
        const emailText = `Utiliza la siguiente contraseña para acceder a tu cuenta: ${resetToken}`;
        await this.emailService.sendEmail(user.email, emailSubject, emailText);
        return { message: 'Se ha enviado un correo electrónico de recuperación de contraseña' };
    }
}
