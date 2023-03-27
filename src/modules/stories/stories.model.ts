import { Column, Model, Table, DataType, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import sequelize from 'sequelize';
import { Author } from '../authors/authors.model';
import { Genre } from '../genres/genres.model';
import { UserToStory } from '../models/user-story.model';
import { User } from '../models/users.model';
import { StoryToAuthor } from '../models/story-author.model';
import { StoryToGenre } from '../models/story-genre.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'stories' })
export class Story extends Model<Story> {
    @Column({ type: DataType.UUID, unique: true, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    @ApiProperty({ description: 'Story ID' })
    id: string;

    @BelongsToMany(() => User, () => UserToStory)
    users: Array<User & { UserToStory: UserToStory }>;

    @BelongsToMany(() => Author, () => StoryToAuthor)
    authors: Array<Author & { StoryAuthor: StoryToAuthor }>;

    @BelongsToMany(() => Genre, () => StoryToGenre)
    genres: Array<Genre & { StoryGenre: StoryToGenre }>;

    @Column({ type: DataType.STRING })
    @ApiProperty({ description: 'Story title' })
    title: string;

    @Column({ type: DataType.FLOAT, defaultValue: 0 })
    @ApiProperty({ description: 'Story rating' })
    rating: number;

    @Column({ type: DataType.STRING })
    @ApiProperty({ description: 'Story description' })
    description: string;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;
}
