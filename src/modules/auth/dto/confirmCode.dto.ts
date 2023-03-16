import { IsNumber, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class ConfirmCodeDto {
    @IsNumber()
    @ApiProperty({ description: 'Verification code received from the call' })
    code: number;

    @IsString()
    @ApiProperty({ description: 'Call id from database' })
    callId: string;
}
