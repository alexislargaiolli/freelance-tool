import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from '../validations/register.dto';
import { AuthDto } from '../validations/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post()
    async auth(@Body() authDto: AuthDto) {
        return this.authService.authenticate(authDto.username, authDto.password);
    }

    @Get('me')
    @UseGuards(AuthGuard())
    async isLoggedIn(@Req() request) {
        return request.user;
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.firstname, body.lastname, body.email, body.username, body.password);
    }

}
