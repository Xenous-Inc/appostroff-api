import { Column, Table, DataType, Model, ForeignKey } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { User } from '../users/users.model';

@Table({ tableName: 'PhoneConfirmation' })
export class Auth extends Model<Auth> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        unique: true,
        references: { model: 'users', key: 'id' },
        allowNull: true,
        defaultValue: sequelize.UUIDV4,
    })
    userId: string;

    @Column({ type: DataType.STRING, unique: true })
    phone: string;

    @Column({ type: DataType.NUMBER })
    code: number;

    @Column({ type: DataType.BOOLEAN })
    isConfirmed: boolean;

    @Column({ type: DataType.NUMBER })
    callId: string;
}
