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
import { ReadingStatisticService } from './reading-statistics.service';
import { CreateReadingStatisticDto } from './dto/create-reading-statistic.dto';
import { UpdateReadingStatisticDto } from './dto/update-reading-statistic.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Reading Statistics')
@Controller('reading-statistics')
export class ReadingStatisticsController {
  constructor(
    private readonly readingStatisticsService: ReadingStatisticService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'create reading-statistic' })
  @Post('create')
  create(@Body() createReadingStatisticDto: CreateReadingStatisticDto) {
    return this.readingStatisticsService.create(createReadingStatisticDto);
  }

  @ApiOperation({ summary: 'find all reading-statistics' })
  @Get('findAll')
  findAll() {
    return this.readingStatisticsService.findAll();
  }

  @ApiOperation({ summary: 'find by id reading-statistic' })
  @UseGuards(UserSelfGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.readingStatisticsService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit reading-statistic' })
  @UseGuards(UserSelfGuard)
  @Patch('edit/:id')
  update(
    @Param('id') id: string,
    @Body() updateReadingStatisticDto: UpdateReadingStatisticDto,
  ) {
    return this.readingStatisticsService.update(+id, updateReadingStatisticDto);
  }

  @ApiOperation({ summary: 'delete reading-statistic' })
  @UseGuards(UserSelfGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.readingStatisticsService.remove(+id);
  }
}
