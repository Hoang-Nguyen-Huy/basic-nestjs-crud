import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/dto/user.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';
import { ApiAcceptedResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseFail, LoginResponseSuccess } from 'src/response/LoginResponse.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiAcceptedResponse({
        description: 'Login Successfully',
        type: LoginResponseSuccess
    })
    @ApiInternalServerErrorResponse({
        description: 'Login Failied',
        type: LoginResponseFail
    })
    signIn(@Body(new ValidationPipe()) userDto: UsersDto) {
        return this.authService.signIn(userDto.username, userDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    getProfile(@Request() req) {
        return req.user;
    }
}
