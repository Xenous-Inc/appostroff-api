import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string): Promise<void> {
        return this.usersService.removeUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(user, id);
    }
}
