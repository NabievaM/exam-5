import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}
  create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = this.authorRepo.create({ ...createAuthorDto });
    return this.authorRepo.save(newAuthor);
  }

  findAll() {
    return this.authorRepo.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorRepo.findOne({ where: { id } });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.authorRepo.update({ id }, { ...updateAuthorDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.authorRepo.delete({ id });
    return id;
  }
}
