import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/jwt/jwt-strategy.service';
import { AuthController } from './controller/auth.controller';
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    providers: [
        AuthService, JwtStrategy, RolesGuard,
    ],
    controllers: [
        AuthController,
    ],
    exports: [
        PassportModule, RolesGuard,
    ],
})
export class AuthModule { }
