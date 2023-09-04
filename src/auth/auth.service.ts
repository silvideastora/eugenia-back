import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        console.log(pass, user.password)
        if (!bcrypt.compareSync(pass, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '1h'
            }),
        };
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
}
