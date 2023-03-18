import { IsNotEmpty, IsString } from 'class-validator';
export class CreateStoryDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    title: string;
}
