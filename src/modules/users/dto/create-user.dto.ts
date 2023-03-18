import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('RU')
    phone: string;

    @IsNotEmpty()
    @IsString()
    name: string;
}
