import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [  MongooseModule.forRoot('mongodb+srv://king:Espartaco321@cluster0.ofypl.mongodb.net/?retryWrites=true&w=majority'),AuthModule, UsersModule, InvitationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
