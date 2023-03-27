import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsPhoneNumber()
    phone: string;
}
