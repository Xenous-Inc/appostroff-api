import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class AuthDto {
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    phone: string;

    code: number;
}
