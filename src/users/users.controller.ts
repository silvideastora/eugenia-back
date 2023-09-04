import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "../dto/create-user-dto";
import {User} from "../schemas/users";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
        return this.userService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<User | null> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User | null> {
        return this.userService.remove(id);
    }
}
