import {Body, HttpException, HttpStatus, Injectable, ValidationPipe} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {User} from "../schemas/users";
import {CreateUserDto} from "../dto/create-user-dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
        let user = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (user) {
            throw new HttpException(
                'Este email ya esta registrado',
                HttpStatus.BAD_REQUEST,
            );
        }
        user = await this.userModel.findOne({ apartment: createUserDto.apartment }).exec();
        if (user) {
            throw new HttpException(
                'Este apartamento ya esta registrado',
                HttpStatus.BAD_REQUEST,
            );
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
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
