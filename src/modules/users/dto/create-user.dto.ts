import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsPhoneNumber()
    @ApiProperty({ example: '+79620440994', description: 'Phone user' })
    phone: string;
}
