import { IsNotEmpty, MaxLength, Min, MinLength } from "class-validator";
import { Role } from "src/roles/role.enum";

export class UsersDto {
    @IsNotEmpty()
    @MinLength(5, {
        message: 'This username is too short',
    })
    @MaxLength(20, {
        message: 'This username is too long',
    })
    username:string;

    @IsNotEmpty()
    @MinLength(6, {
        message: 'This password is too short',
    })
    @MaxLength(20, {
        message: 'This password is too long',
    })
    password: string;

    iv?: string;

    role?: Role;
}   