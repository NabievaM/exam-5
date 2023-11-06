import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('FeedBacks')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Public()
  @ApiOperation({ summary: 'create feedback' })
  @Post('create')
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Public()
  @ApiOperation({ summary: 'find all feedbacks' })
  @Get('findAll')
  findAll() {
    return this.feedbackService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'find by id feedback' })
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit feedback' })
  @UseGuards(UserSelfGuard)
  @Patch('edit/:id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @ApiOperation({ summary: 'delete feedback' })
  @UseGuards(UserSelfGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
