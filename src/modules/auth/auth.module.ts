import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([User]), JwtModule.register({})],
    providers: [AuthService, AtStrategy, RtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
