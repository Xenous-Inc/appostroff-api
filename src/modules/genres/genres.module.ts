import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenreToAuthor } from '../models/genre-author.model';
import { StoryToGenre } from '../models/story-genre.model';
import { Genre } from './genres.model';

@Module({
    imports: [SequelizeModule.forFeature([Genre, GenreToAuthor, StoryToGenre])],
})
export class GenresModule {}
