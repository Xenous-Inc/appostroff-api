import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoryToAuthor } from '../models/story-author.model';
import { StoryToGenre } from '../models/story-genre.model';
import { UserToStory } from '../models/user-story.model';
import { User } from '../models/users.model';
import { StoriesController } from './stories.controller';
import { Story } from './stories.model';
import { StoriesService } from './stories.service';

@Module({
    imports: [SequelizeModule.forFeature([Story, UserToStory, User, StoryToAuthor, StoryToGenre])],
    providers: [StoriesService],
    controllers: [StoriesController],
})
export class StoriesModule {}
