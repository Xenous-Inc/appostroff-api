import { IS_NUMBER, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class AuthDto {
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('RU')
    phone: string;
    @IsNotEmpty()
    code: number;
}
