import { Column, Table, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { User } from '../models/users.model';

@Table({ tableName: 'PhoneConfirmation' })
export class Auth extends Model<Auth> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.STRING })
    phone: string;

    @Column({ type: DataType.INTEGER })
    code: number;

    @Column({ type: DataType.BOOLEAN })
    isConfirmed: boolean;

    @Column({ type: DataType.INTEGER })
    callId: number;
}
