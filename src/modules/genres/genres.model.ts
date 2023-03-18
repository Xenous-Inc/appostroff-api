import { Table, Model, BelongsToMany, Column, DataType } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { Story } from '../stories/stories.model';
import { GenreToAuthor } from '../models/genre-author.model';
import { StoryToGenre } from '../models/story-genre.model';
import { Author } from '../authors/authors.model';

@Table({ tableName: 'genres' })
export class Genre extends Model<Genre> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    description: string;

    @BelongsToMany(() => Story, () => StoryToGenre)
    stories: Array<Story & { StoryToGenre: StoryToGenre }>;

    @BelongsToMany(() => Author, () => GenreToAuthor)
    authors: Array<Author & { GenreAuthor: GenreToAuthor }>;
}
