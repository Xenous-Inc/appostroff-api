import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Genre } from '../genres/genres.model';
import { Story } from '../stories/stories.model';

@Table({ tableName: 'story-genre' })
export class StoryToGenre extends Model<StoryToGenre> {
    @ForeignKey(() => Story)
    @Column({ type: DataType.UUID })
    storyId: string;

    @ForeignKey(() => Genre)
    @Column({ type: DataType.UUID })
    genreId: string;
}
