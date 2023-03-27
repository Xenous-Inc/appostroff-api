import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateStoryDto {
    @ApiProperty({ example: 'This story tells how to smack my ass', description: 'Sommething about Story' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'Gachi', description: 'Name Story' })
    @IsString()
    title: string;
}
