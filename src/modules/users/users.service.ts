import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private roleService: RolesService,
        @InjectModel(Role) private readonly roleModel: typeof Role,
    ) {}
    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.userModel.create<User>(dto);
        return user;
    }
    async findUserById(id: string): Promise<User> {
        return await this.userModel.findOne({ where: { id } });
    }
    async findAllUsers(): Promise<User[]> {
        return await this.userModel.findAll({ include: { all: true } });
    }

    async updateUser(user: UpdateUserDto, id: string) {
        const updUser = {
            phone: user.phone,
        };
        const userU = await this.userModel.update(updUser, { where: { id }, returning: true });
        return userU[0][1];
    }

    async removeUser(id: string) {
        await this.userModel.destroy({ where: { id } });
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('roles', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userModel.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.isBanned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
