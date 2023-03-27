import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Name of role' })
    readonly value: string;
    @ApiProperty({ example: 'exNKknk321jkH.!kl', description: 'ID user ' })
    readonly userId: string;
}
