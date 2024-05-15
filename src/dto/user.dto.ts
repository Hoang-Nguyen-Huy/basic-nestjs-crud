import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Role } from "src/roles/role.enum";

export class UsersDto {
    @ApiProperty({ 
        example: 'hoang123',
        description: 'Username must be unique'
    })
    @IsNotEmpty()
    @MinLength(5, {
        message: 'This username is too short',
    })
    @MaxLength(20, {
        message: 'This username is too long',
    })
    username:string;

    @ApiProperty({
        example: 'Password123',
    })
    @IsNotEmpty()
    @MinLength(6, {
        message: 'This password is too short',
    })
    @MaxLength(20, {
        message: 'This password is too long',
    })
    password: string;

    iv?: string;

    @ApiProperty({
        enum: ['admin', 'user'],
        example: 'users or admin',
        description: 'Admin has to input the role due to authorization'
    })
    role?: Role;
}   