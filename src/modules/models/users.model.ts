import sequelize from 'sequelize';
import { Column, Table, DataType, Model, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { Story } from '../stories/stories.model';
import { UserRole } from './types';
import { UserToStory } from './user-story.model';

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

    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.Reader,
    })
    role: UserRole;

    @BelongsToMany(() => Story, () => UserToStory)
    stories: Array<Story & { UserToStory: UserToStory }>;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBanned: boolean;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    //	quotes: ...
    //	stats:...
    //	interests: ...
    //	settings: ...
}
