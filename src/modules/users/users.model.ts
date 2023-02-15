import { Column, Table, DataType, Model } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @Column({ type: DataType.STRING, unique: true, autoIncrement: true, primaryKey: true })
    id: string;
    @Column({ type: DataType.STRING, unique: true })
    phone: string;
    @Column({ type: DataType.STRING })
    name: string;
    //	quotes: ...
    //	stats:...
    //	interests: ...
    //	settings: ...
}
