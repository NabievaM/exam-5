import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Category } from '../category/entities/category.entity';
import { Author } from '../author/entities/author.entity';
import { Feedback } from '../feedback/entities/feedback.entity';
import { FeedbackService } from '../feedback/feedback.service';
import { FormatBookPrice } from '../format-book-price/entities/format-book-price.entity';
import { FormatBookPriceService } from '../format-book-price/format-book-price.service';
import { ReadingStatistic } from '../reading-statistics/entities/reading-statistic.entity';
import { ReadingStatisticService } from '../reading-statistics/reading-statistics.service';
import { LikeService } from '../like/like.service';
import { Like } from '../like/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Category,
      Author,
      Feedback,
      FormatBookPrice,
      ReadingStatistic,
      Like,
    ]),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    FeedbackService,
    FormatBookPriceService,
    ReadingStatisticService,
    LikeService,
  ],
})
export class BookModule {}
