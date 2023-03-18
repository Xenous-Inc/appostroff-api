import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Sequelize } from 'sequelize';
import { UserToStory } from '../models/user-story.model';
import { User } from '../models/users.model';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './stories.model';

@Injectable()
export class StoriesService {
    constructor(
        @InjectModel(Story) private readonly storyModel: typeof Story,
        @InjectModel(UserToStory) private userStoryModel: typeof UserToStory,
        @InjectModel(User) private readonly userModel: typeof User,
    ) {}

    async create(createStoryDto: CreateStoryDto): Promise<Story> {
        return this.storyModel.create(createStoryDto);
    }

    async assignUserToStory(storyId: string, userId: string): Promise<UserToStory> {
        const userStory = {
            storyId,
            userId,
        };
        return await this.userStoryModel.create(userStory);
    }

    async getRandomStory(): Promise<Story> {
        return await this.storyModel.findOne({ order: Sequelize.literal('rand()'), limit: 5 });
    }

    async getStory(storyId: string) {
        const user = await this.userModel
            .findByPk(storyId, { include: [User] })
            .then(() => this.userModel.getAttributes());

        return this.storyModel.findOne({
            order: Sequelize.literal('rand()'),
            limit: 5,
            where: { attribute: { [sequelize.Op.not]: [user.stories] } },
        });
    }

    async getLastStory(): Promise<Story> {
        return this.storyModel.findOne({ order: [['createdAt', 'DESC']] });
    }
}
