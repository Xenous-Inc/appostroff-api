import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from '../../core/common/decorators';
import { RtGuard } from '../../core/common/guards';
import * as defaults from '../../core/constants';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Public()
    @Post(defaults.SIGN_UP)
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() dto: CreateUserDto): Promise<Tokens> {
        return this.authService.signUp(dto);
    }

    @Public()
    @Post(defaults.SIGN_IN)
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: CreateUserDto): Promise<Tokens> {
        return this.authService.signIn(dto);
    }

    @Post(defaults.LOGOUT)
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() id: string): Promise<boolean> {
        return this.authService.logout(id);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post(defaults.REFRESH)
    @HttpCode(HttpStatus.OK)
    refresh(@GetCurrentUserId() id: string, @GetCurrentUser('refreshToken') rToken: string): Promise<Tokens> {
        return this.authService.refreshTokens(id, rToken);
    }
}
