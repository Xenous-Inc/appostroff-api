import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { UserToStory } from '../models/user-story.model';
import { User } from '../users/users.model';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './stories.model';
import { StoryNotFoundException } from 'src/core/common/exceptions/story/story-not-found.exception';
import { UserNotFoundException } from 'src/core/common/exceptions/user/user-not-found.exception';

@Injectable()
export class StoriesService {
    constructor(
        @InjectModel(Story) private readonly storyModel: typeof Story,
        @InjectModel(UserToStory) private userStoryModel: typeof UserToStory,
        @InjectModel(User) private readonly userModel: typeof User,
    ) {}

    async create(dto: CreateStoryDto): Promise<Story> {
        return this.storyModel.create(dto);
    }

    async assignUserToStory(storyId: string, userId: string): Promise<UserToStory> {
        const userStory = {
            storyId,
            userId,
        };
        return await this.userStoryModel.create(userStory);
    }

    async getRandomStory() {
        return await this.storyModel.findOne({ order: Sequelize.literal('random()'), limit: 10 });
    }

    async getStory(userId: string) {
        const user = await this.userModel.findByPk(userId, { include: [Story] });
        if (!user) {
            throw new UserNotFoundException();
        }
        const readStories = user.stories;
        const allStories = await this.storyModel.findAll();

        if (readStories.length === allStories.length) {
            throw new StoryNotFoundException();
        }
        let randStory = await this.getRandomStory();
        while (readStories.some(story => story.id === randStory.id)) {
            randStory = await this.getRandomStory();
        }
        user.$add('stories', randStory);
        return randStory;
    }

    async clearStory(userId: string) {
        const user = await this.userModel.findByPk(userId, { include: [Story] });
        user.$set('stories', []);
        return user;
    }
    async getLastStory(): Promise<Story> {
        return this.storyModel.findOne({ order: [['createdAt', 'DESC']] });
    }
}
