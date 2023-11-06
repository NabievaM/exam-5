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
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Likes')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Public()
  @ApiOperation({ summary: 'like' })
  @Post('create')
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Public()
  @ApiOperation({ summary: 'find all likes' })
  @Get('findAll')
  findAll() {
    return this.likeService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'find by id like' })
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit like' })
  @UseGuards(UserSelfGuard)
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(+id, updateLikeDto);
  }

  @ApiOperation({ summary: 'delete like' })
  @UseGuards(UserSelfGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
