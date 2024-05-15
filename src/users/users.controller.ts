import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from 'src/dto/user.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {};

    @Public()
    @Post('/register') // Register
    async createUser(@Body(new ValidationPipe) userDto: UsersDto): Promise<ResponseData<UsersDto>> {
        const checkUser = await this.userService.createUser(userDto);
        if (checkUser === null) {
            return new ResponseData<UsersDto>(null, 401, 'This username was taken!!!');
        } else {
            return new ResponseData<UsersDto>(checkUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        }
    }
}
