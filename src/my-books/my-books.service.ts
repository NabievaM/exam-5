import { Injectable } from '@nestjs/common';
import { CreateMyBookDto } from './dto/create-my-book.dto';
import { UpdateMyBookDto } from './dto/update-my-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MyBook } from './entities/my-book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MyBooksService {
  constructor(
    @InjectRepository(MyBook)
    private readonly myBookRepo: Repository<MyBook>,
  ) {}
  create(createMyBookDto: CreateMyBookDto) {
    return this.myBookRepo.save(createMyBookDto);
  }

  findAll(): Promise<MyBook[]> {
    return this.myBookRepo.find({ relations: ['user', 'statistic'] });
  }

  findOne(id: number): Promise<MyBook> {
    return this.myBookRepo.findOne({ where: { id } });
  }

  async update(id: number, updateMyBookDto: UpdateMyBookDto): Promise<MyBook> {
    await this.myBookRepo.update({ id }, { ...updateMyBookDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.myBookRepo.delete({ id });
    return id;
  }
}
