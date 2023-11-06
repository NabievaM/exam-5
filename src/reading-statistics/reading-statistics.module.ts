import { Module } from '@nestjs/common';
import { ReadingStatisticService } from './reading-statistics.service';
import { ReadingStatisticsController } from './reading-statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingStatistic } from './entities/reading-statistic.entity';
import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { MyBook } from '../my-books/entities/my-book.entity';
import { MyBooksService } from '../my-books/my-books.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingStatistic, Book, User, MyBook])],
  controllers: [ReadingStatisticsController],
  providers: [ReadingStatisticService, MyBooksService],
})
export class ReadingStatisticsModule {}
