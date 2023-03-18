import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(id);
    }

    @Get()
    findAll() {
        return this.usersService.findAllUsers();
    }
    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(user, id);
    }
}
