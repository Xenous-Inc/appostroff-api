import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Name of role' })
    values: string;
}
