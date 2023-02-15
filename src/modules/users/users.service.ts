import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}
    async create(user: CreateUserDto): Promise<User> {
        return await this.userModel.create<User>(user);
    }
    async findUserById(id: string): Promise<User> {
        return await this.userModel.findOne({ where: { id } });
    }
    async updateUser(user: UpdateUserDto, id: string) {
        return this.userModel.update(user, { where: { id } });
    }
    async removeUser(id: string) {
        await this.userModel.destroy({ where: { id } });
    }
}
