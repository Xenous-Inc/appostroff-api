import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoryToAuthor } from '../models/story-author.model';
import { StoryToGenre } from '../models/story-genre.model';
import { UserToStory } from '../models/user-story.model';
import { User } from '../users/users.model';
import { StoriesController } from './stories.controller';
import { Story } from './stories.model';
import { StoriesService } from './stories.service';

@Module({
    imports: [SequelizeModule.forFeature([Story, UserToStory, User, StoryToAuthor, StoryToGenre]), JwtModule],
    providers: [StoriesService],
    controllers: [StoriesController],
})
export class StoriesModule {}
