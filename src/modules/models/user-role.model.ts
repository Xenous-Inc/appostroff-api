import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { User } from './users.model';

@Table({ tableName: 'user-role', createdAt: false, updatedAt: false })
export class UserToRole extends Model<UserToRole> {
    @ForeignKey(() => Role)
    @Column({ type: DataType.UUID })
    roleId: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;
}
