import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/core/common/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/core/common/guards/roles.guard';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './stories.model';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storyService: StoriesService) {}

    @ApiOperation({ summary: 'Create story' })
    @ApiResponse({ status: 200, description: 'Created new story' })
    @Post()
    @Roles('AUTHOR', 'ADMIN')
    @UseGuards(RolesGuard)
    create(@Body() createStoryDto: CreateStoryDto) {
        return this.storyService.create(createStoryDto);
    }

    @ApiOperation({ summary: 'Get story' })
    @ApiResponse({ status: 200, type: Story })
    @Get(':id')
    getStory(@Param('id') id: string) {
        return this.storyService.getStory(id);
    }

    // @Get(':id')
    // clearStory(@Param('id') id: string) {
    //     return this.storyService.clearStory(id);
    // }
}
