import { Column, Table, DataType, Model, HasMany } from 'sequelize-typescript';
import sequelize from 'sequelize';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true })
    phone: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    hashedRt: string;
    //	quotes: ...
    //	stats:...
    //	interests: ...
    //	settings: ...
}
