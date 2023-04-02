import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({ summary: 'Create role' })
    @ApiResponse({ status: 201, description: 'Created new role' })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get role' })
    @ApiResponse({ status: 200, description: 'Get role', type: Role })
    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
