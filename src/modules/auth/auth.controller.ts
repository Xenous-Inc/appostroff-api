import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { GetCurrentUser, GetCurrentUserId, Public } from '../../core/common/decorators';
import { RtGuard } from '../../core/common/guards';
import { ConfirmCodeDto } from './dto/confirmCode.dto';
import { RequestCodeDto } from './dto/requestCode.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokensResponse } from './types/responses/tokens.response';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('requestCode')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Request a phone call for auth' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Requested a phone call', type: Boolean })
    requestCode(@Body() dto: RequestCodeDto): Promise<boolean> {
        return this.authService.requestCode(dto);
    }

    @Public()
    @Post('confirmationCode')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Comparing sent code with recieved code' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Code confirmed', type: TokensResponse })
    confirmationCode(@Body() dto: ConfirmCodeDto): Promise<Tokens> {
        return this.authService.confirmationCode(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Logged out', type: Boolean })
    @ApiBearerAuth()
    logout(@GetCurrentUserId() id: string): Promise<boolean> {
        return this.authService.logout(id);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Refreshed tokens', type: TokensResponse })
    @ApiBearerAuth()
    refresh(@GetCurrentUserId() id: string, @GetCurrentUser('refreshToken') rToken: string): Promise<Tokens> {
        return this.authService.refreshTokens(id, rToken);
    }
}
