import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import {User, UserDocument} from "../schemas/users";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectModel(User.name) private readonly usersService: Model<UserDocument>,
    ) {}

    async validate(email: string) {
        const user = await this.usersService.findOne({email});
        return !user;
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        });
    };
}
