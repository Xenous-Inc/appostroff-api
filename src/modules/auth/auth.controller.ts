import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from '../../core/common/decorators';
import { RtGuard } from '../../core/common/guards';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // @Public()
    // @Post(defaults.SIGN_UP)
    // @HttpCode(HttpStatus.CREATED)
    // signUp(@Body() dto: CreateUserDto): Promise<Tokens> {
    //     return this.authService.signUp(dto);
    // }

    @Public()
    @Post('requestCode')
    @HttpCode(HttpStatus.OK)
    requestCode(@Body() dto: AuthDto): Promise<boolean> {
        return this.authService.requestCode(dto);
    }

    @Public()
    @Post('confirmationCode')
    @HttpCode(HttpStatus.OK)
    confirmationCode(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.confirmationCode(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() id: string): Promise<boolean> {
        return this.authService.logout(id);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(@GetCurrentUserId() id: string, @GetCurrentUser('refreshToken') rToken: string): Promise<Tokens> {
        return this.authService.refreshTokens(id, rToken);
    }
}
