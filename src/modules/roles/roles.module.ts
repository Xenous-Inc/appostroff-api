import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UserToRole } from '../models/user-role.model';
import { Auth } from '../auth/auth.model';
import { User } from '../users/users.model';

@Module({
    imports: [SequelizeModule.forFeature([Role, User, UserToRole, Auth])],
    providers: [RolesService],
    controllers: [RolesController],
    exports: [RolesService],
})
export class RolesModule {}
