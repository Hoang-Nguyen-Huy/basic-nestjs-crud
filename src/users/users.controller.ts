import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from 'src/dto/user.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage } from 'src/global/globalEnum';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { RegisterResponseFail, RegisterResponseSuccess } from 'src/response/ResgisterResponse.response';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {};

    @Public()
    @Post('/register') // Register
    @ApiCreatedResponse({
        description: 'Register Successfully',
        type: RegisterResponseSuccess
    })
    @ApiForbiddenResponse({
        description: 'Register Failed',
        type: RegisterResponseFail
    })
    async createUser(@Body(new ValidationPipe) userDto: UsersDto): Promise<ResponseData<UsersDto>> {
        const checkUser = await this.userService.createUser(userDto);
        if (checkUser === null) {
            return new ResponseData<UsersDto>(null, 403, 'This username was taken!!!');
        } else {
            return new ResponseData<UsersDto>(checkUser, 201, HttpMessage.SUCCESS);
        }
    }
}
