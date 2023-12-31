import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {EmailModule} from "../email/email.module";

@Module({
  imports: [
        UsersModule,
      EmailModule,
      JwtModule.register({
        global: true,
        secret: 'jwtConstants.secret',
        signOptions: { expiresIn: '60s' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
