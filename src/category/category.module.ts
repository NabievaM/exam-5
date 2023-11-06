import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Book } from '../book/entities/book.entity';
import { BookService } from '../book/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book])],
  controllers: [CategoryController],
  providers: [CategoryService, BookService],
})
export class CategoryModule {}
