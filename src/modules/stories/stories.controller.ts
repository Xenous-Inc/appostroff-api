import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/core/common/decorators';
import { Roles } from 'src/core/common/decorators/roles-auth.decorator';
import { UserRole } from '../models/types';
import { CreateStoryDto } from './dto/create-story.dto';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storyService: StoriesService) {}

    @Post()
    @Roles(UserRole.Admin)
    create(@Body() createStoryDto: CreateStoryDto) {
        return this.storyService.create(createStoryDto);
    }
}
