import { Injectable, Inject } from '@nestjs/common';
import { where } from 'sequelize';
import { USER_REPOSITORY } from 'src/core/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}
    async create(user: CreateUserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }
    async findUserById(id: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }
    async updateUser(user: UpdateUserDto, id: string) {
        return this.userRepository.update(user, { where: { id } });
    }
    async removeUser(id: string) {
        await this.userRepository.destroy({ where: { id } });
    }
}
