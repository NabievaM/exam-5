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
import { MyBooksService } from './my-books.service';
import { CreateMyBookDto } from './dto/create-my-book.dto';
import { UpdateMyBookDto } from './dto/update-my-book.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('My-books')
@Controller('my-books')
export class MyBooksController {
  constructor(private readonly myBooksService: MyBooksService) {}

  @ApiOperation({ summary: 'create my-book' })
  @UseGuards(UserGuard)
  @Post('create')
  create(@Body() createMyBookDto: CreateMyBookDto) {
    return this.myBooksService.create(createMyBookDto);
  }

  @ApiOperation({ summary: 'find all my-books' })
  @UseGuards(UserSelfGuard)
  @Get('findAll')
  findAll() {
    return this.myBooksService.findAll();
  }

  @ApiOperation({ summary: 'find by id my-book' })
  @UseGuards(UserSelfGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.myBooksService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit my-book' })
  @UseGuards(UserSelfGuard)
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateMyBookDto: UpdateMyBookDto) {
    return this.myBooksService.update(+id, updateMyBookDto);
  }

  @ApiOperation({ summary: 'delete my-book' })
  @UseGuards(UserSelfGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.myBooksService.remove(+id);
  }
}
