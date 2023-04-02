import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './authors.model';

@Module({
    imports: [SequelizeModule.forFeature([Author])],
})
export class AuthorsModule {}
