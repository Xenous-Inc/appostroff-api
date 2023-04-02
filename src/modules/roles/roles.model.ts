import { ApiProperty } from '@nestjs/swagger';
import sequelize from 'sequelize';
import { Column, Table, DataType, Model, BelongsToMany } from 'sequelize-typescript';
import { UserToRole } from '../models/user-role.model';
import { User } from '../users/users.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
    @ApiProperty({ example: '123asdjlk.23KJSA', description: 'ID Role' })
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ApiProperty({ example: 'ADMIN', description: 'Unique role value' })
    @Column({ type: DataType.STRING })
    value: string;

    @BelongsToMany(() => User, () => UserToRole)
    users: User[];
}
