import { Controller, Post, Body} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "../dto/create-user-dto";
import {User} from "../schemas/users";
import {Public} from "../auth/decorators/public.decorators";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    @Public()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}
