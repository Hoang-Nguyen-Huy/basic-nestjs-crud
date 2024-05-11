import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) userDto: UsersDto) {
        return this.authService.signIn(userDto.username, userDto.password);
    }
}
