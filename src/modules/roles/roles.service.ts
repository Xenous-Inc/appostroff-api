import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}

    async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
        const role = await this.roleModel.create(createRoleDto);
        return role;
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleModel.findOne({ where: { value } });
        return role;
    }
}
