import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Story } from '../stories/stories.model';
import { Author } from '../authors/authors.model';

@Table({ tableName: 'story-author' })
export class StoryToAuthor extends Model<StoryToAuthor> {
    @ForeignKey(() => Story)
    @Column({ type: DataType.UUID })
    storyId: string;

    @ForeignKey(() => Author)
    @Column({ type: DataType.UUID })
    authorId: string;
}
