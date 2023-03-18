import { Tokens } from '../tokens.type';
import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse implements Tokens {
    @ApiProperty({ description: 'Access token' })
    access_token: string;
    @ApiProperty({ description: 'Refresh token' })
    refresh_token: string;
}
