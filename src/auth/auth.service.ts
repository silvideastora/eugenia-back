import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash } from "bcrypt-ts";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        console.log(pass, user.password)
        if (!compareSync(pass, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.email, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return hash(password, saltRounds);
    }
}
