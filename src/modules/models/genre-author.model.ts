import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Author } from '../authors/authors.model';
import { Genre } from '../genres/genres.model';

@Table({ tableName: 'genre-author' })
export class GenreToAuthor extends Model<GenreToAuthor> {
    @ForeignKey(() => Genre)
    @Column
    genreId: string;

    @ForeignKey(() => Author)
    @Column
    authorId: string;
}
