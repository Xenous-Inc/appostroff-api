import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users';
import { UsersController } from './users.controller';

@Module({
    providers: [UsersService, Users],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
