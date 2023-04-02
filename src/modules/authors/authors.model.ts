import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { Story } from '../stories/stories.model';
import { Genre } from '../genres/genres.model';
import { GenreToAuthor } from '../models/genre-author.model';
import { StoryToAuthor } from '../models/story-author.model';

@Table({ tableName: 'authors' })
export class Author extends Model<Author> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @BelongsToMany(() => Story, () => StoryToAuthor)
    story: Array<Story & { StoryAuthor: StoryToAuthor }>;

    @BelongsToMany(() => Genre, () => GenreToAuthor)
    genre: Array<Genre & { GenreAuthor: GenreToAuthor }>;
}
