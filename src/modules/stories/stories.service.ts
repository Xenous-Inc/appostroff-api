import { Body, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Sequelize, where } from 'sequelize';
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
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const stories = user.stories;

        let randStory = await this.getRandomStory();

        function checkAvailability(arr, val) {
            console.log('ЭТО РАНДОМНАЯ СТОРКА!!!!!!!!');
            console.log(val);
            console.log('ЭТО МАССИВ!!!!!');
            console.log(arr);
            console.log('ЭТО ЗНАЧЕНИЕ ФУНКЦИИ!!!!!!!');
            console.log(arr.some(arrVal => val === arrVal));
            return arr.some(arrVal => val === arrVal);
        }

        while (checkAvailability(stories, randStory)) {
            console.log('АААААААААААААААААААААААААА\n');
            console.log(checkAvailability(stories, randStory));
            randStory = await this.getRandomStory();
            console.log(randStory);
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
