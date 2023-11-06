import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './entities/author.entity';

@ApiTags('Authors')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'create author' })
  @ApiResponse({ status: 201, type: Author })
  @Post('create')
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Public()
  @ApiOperation({ summary: 'FindAll Author' })
  @ApiResponse({ status: 200, type: [Author] })
  @Get('findAll')
  findAll() {
    return this.authorService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'FindById Author' })
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit Author' })
  @ApiResponse({ status: 200, type: Author })
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete Author' })
  @ApiResponse({ status: 200, type: Author })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
