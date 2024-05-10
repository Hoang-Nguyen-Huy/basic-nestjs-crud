import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from 'src/dto/user.dto';
import { ResponseData } from 'src/global/globalClass';
import { UsersEntity } from 'src/entities/user.entity';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {};

    @Post('/register') // Register
    async createUser(@Body(new ValidationPipe) userDto: UsersDto): Promise<ResponseData<UsersEntity>> {
        try {
            return new ResponseData<UsersEntity>(await this.userService.createUser(userDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch(error) {
            return new ResponseData<UsersEntity>(await this.userService.createUser(userDto), HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}
