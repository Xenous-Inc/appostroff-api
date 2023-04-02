import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserToRole } from '../models/user-role.model';
import { Role } from '../roles/roles.model';
import { Story } from '../stories/stories.model';
import { UserToStory } from '../models/user-story.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { User } from './users.model';
@Module({
    imports: [
        SequelizeModule.forFeature([User, UserToRole, Role, Story, UserToStory]),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
