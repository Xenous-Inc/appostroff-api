import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Roles } from 'src/core/common/role/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/core/common/role/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, type: User })
    @Get(':id')
    findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(id);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.usersService.findAllUsers();
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }

    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, type: User })
    @Roles('ADMIN', 'MODERATOR', 'READER', 'AUTHOR')
    @UseGuards(RolesGuard)
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(user, id);
    }

    @ApiOperation({ summary: 'Give a role' })
    @ApiResponse({ status: 200 })
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Ban user' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN', 'MODERATOR')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
