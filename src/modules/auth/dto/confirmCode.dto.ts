import { IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RequestCodeDto } from './requestCode.dto';
export class ConfirmCodeDto extends PartialType(RequestCodeDto) {
    @IsNumber()
    @ApiProperty({ description: 'Verification code received from the call' })
    code: number;
}
