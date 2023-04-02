import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateStoryDto {
    @ApiProperty({ example: 'This story tells how to study alphabet', description: 'Sommething about Story' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'Alphabet', description: 'Name Story' })
    @IsString()
    title: string;
}
