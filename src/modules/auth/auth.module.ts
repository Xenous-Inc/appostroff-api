import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from './auth.model';
import { UsersModule } from '../users/users.module';
import { Role } from '../roles/roles.model';
import { User } from '../users/users.model';

@Module({
    imports: [SequelizeModule.forFeature([User, Auth, Role]), forwardRef(() => UsersModule), JwtModule.register({})],
    providers: [AuthService, AtStrategy, RtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
