import { Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Story } from '../stories/stories.model';
import { User } from '../users/users.model';

@Table({ tableName: 'user-story' })
export class UserToStory extends Model<UserToStory> {
    @ForeignKey(() => Story)
    @Column({ type: DataType.UUID })
    storyId: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @CreatedAt
    @Column
    createdAt: Date;
}
