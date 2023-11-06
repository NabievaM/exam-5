import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}
  create(createContactDto: CreateContactDto) {
    const newContact = this.contactRepo.create({ ...createContactDto });
    return this.contactRepo.save(newContact);
  }

  findAll() {
    return this.contactRepo.find();
  }

  findOne(id: number): Promise<Contact> {
    return this.contactRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    await this.contactRepo.update({ id }, { ...updateContactDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.contactRepo.delete({ id });
    return id;
  }
}
