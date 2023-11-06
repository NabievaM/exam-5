import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Public } from '../common/decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'create contact' })
  @Post('create')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Public()
  @ApiOperation({ summary: 'find all contact' })
  @Get('findAll')
  findAll() {
    return this.contactService.findAll();
  }

  @Public()
  @ApiOperation({ summary: 'find by id contact' })
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit contact' })
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: 'delete contact' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
