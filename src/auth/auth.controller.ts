import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {Public} from "./decorators/public.decorators";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() signInDto: Record<string, string>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }


}
