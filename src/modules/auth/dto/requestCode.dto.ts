import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RequestCodeDto {
    @IsPhoneNumber('RU')
    @ApiProperty({
        description: 'The phone number to which the call will come in the format +79136528185',
        required: true,
    })
    phone: string;
}
