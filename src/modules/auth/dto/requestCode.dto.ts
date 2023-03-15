import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RequestCodeDto {
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    @ApiProperty({
        description: 'The phone number to which the call will come in the format +79136528185',
        required: true,
    })
    phone: string;
}
