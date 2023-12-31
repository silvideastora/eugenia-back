import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new HttpException(
                'Comprueba usuario y contraseña',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!bcrypt.compareSync(pass, user.password)) {
            throw new HttpException(
                'Comprueba usuario y contraseña',
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = { email: user.email };
        return {
            name: user.name,
            lastName: user.lastName,
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '12h'
            }),
        };
    }
}
