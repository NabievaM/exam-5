import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    return this.bookRepo.save(createBookDto);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepo.find({ relations: ['author', 'category'] });
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepo.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.bookRepo.update({ id }, { ...updateBookDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.bookRepo.delete({ id });
    return id;
  }
}
