import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {User} from "../schemas/users";
import {CreateUserDto} from "../dto/create-user-dto";
import { hash } from "bcrypt-ts";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await hash(createUserDto.password, 10)
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
