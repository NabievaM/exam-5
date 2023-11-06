import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FormatBookPriceService } from './format-book-price.service';
import { CreateFormatBookPriceDto } from './dto/create-format-book-price.dto';
import { UpdateFormatBookPriceDto } from './dto/update-format-book-price.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Format-book-price')
@Controller('format-book-price')
export class FormatBookPriceController {
  constructor(
    private readonly formatBookPriceService: FormatBookPriceService,
  ) {}

  @ApiOperation({ summary: 'create format-book-price' })
  @Post('create')
  create(@Body() createFormatBookPriceDto: CreateFormatBookPriceDto) {
    return this.formatBookPriceService.create(createFormatBookPriceDto);
  }

  @Public()
  @ApiOperation({ summary: 'find all format-book-price' })
  @Get('findAll')
  findAll() {
    return this.formatBookPriceService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'find by id format-book-price' })
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.formatBookPriceService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit format-book-price' })
  @Patch('edit/:id')
  update(
    @Param('id') id: string,
    @Body() updateFormatBookPriceDto: UpdateFormatBookPriceDto,
  ) {
    return this.formatBookPriceService.update(+id, updateFormatBookPriceDto);
  }

  @ApiOperation({ summary: 'delete format-book-price' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.formatBookPriceService.remove(+id);
  }
}
