import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './stories.model';
import { StoriesService } from './stories.service';
import { RolesGuard } from 'src/core/common/role/guards/roles.guard';
import { Roles } from 'src/core/common/role/decorators/roles-auth.decorator';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storyService: StoriesService) {}

    @ApiOperation({ summary: 'Create story' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created new story' })
    @Post()
    @Roles('AUTHOR', 'ADMIN')
    @UseGuards(RolesGuard)
    create(@Body() createStoryDto: CreateStoryDto) {
        return this.storyService.create(createStoryDto);
    }

    @ApiOperation({ summary: 'Get story' })
    @ApiResponse({ status: HttpStatus.OK, type: Story })
    @Get(':id')
    getStory(@Param('id') id: string) {
        return this.storyService.getStory(id);
    }

    @ApiOperation({ summary: 'Get random story a guest' })
    @ApiResponse({ status: HttpStatus.OK, type: Story })
    @Get()
    getRandomStory() {
        return this.storyService.getRandomStory();
    }

    // @Get(':id')
    // clearStory(@Param('id') id: string) {
    //     return this.storyService.clearStory(id);
    // }
}
