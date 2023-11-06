import { Module } from '@nestjs/common';
import { FormatBookPriceService } from './format-book-price.service';
import { FormatBookPriceController } from './format-book-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatBookPrice } from './entities/format-book-price.entity';
import { Book } from '../book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatBookPrice, Book])],
  controllers: [FormatBookPriceController],
  providers: [FormatBookPriceService],
})
export class FormatBookPriceModule {}
