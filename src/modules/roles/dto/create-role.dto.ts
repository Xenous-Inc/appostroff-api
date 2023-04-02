import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Name of role' })
    values: string;
}
