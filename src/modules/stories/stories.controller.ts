import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { string } from 'joi';
import { Roles } from 'src/core/common/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/core/common/guards/roles.guard';
import { UserRole } from '../models/types';
import { CreateStoryDto } from './dto/create-story.dto';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storyService: StoriesService) {}
    @Post()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    create(@Body() createStoryDto: CreateStoryDto) {
        return this.storyService.create(createStoryDto);
    }

    @Get(':id')
    getStory(@Param('id') id: string) {
        return this.storyService.getStory(id);
    }

    // @Get(':id')
    // clearStory(@Param('id') id: string) {
    //     return this.storyService.clearStory(id);
    // }
}
