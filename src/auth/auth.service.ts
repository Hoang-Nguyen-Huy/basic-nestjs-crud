import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userSerivce: UsersService,
        private jwtService: JwtService
    ) {};

    async signIn(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userSerivce.checkLogin(username, password);
        if (user === null) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
