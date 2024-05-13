import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersHttpModule } from 'src/users/users-http.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersHttpModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AuthModule {}
