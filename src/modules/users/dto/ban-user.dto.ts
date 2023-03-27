import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({ example: 'exaaslkdj.321kKLklsajd', description: 'ID user' })
    readonly userId: string;

    @ApiProperty({ example: 'HOHOL', description: 'The reason for ban user' })
    readonly banReason: string;
}
