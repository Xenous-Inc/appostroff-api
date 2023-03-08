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
    async findOne(id: string): Promise<User> {
        return await this.userModel.findOne({ where: { id } });
    }
    async findAll(): Promise<User[]> {
        return await this.userModel.findAll();
    }

    async updateUser(user: UpdateUserDto, id: string) {
        const updUser = {
            name: user.name,
            phone: user.phone,
        };
        const userU = await this.userModel.update(updUser, { where: { id }, returning: true });
        return userU;
    }
    async removeUser(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
