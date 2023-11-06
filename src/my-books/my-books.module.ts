import { Module } from '@nestjs/common';
import { MyBooksService } from './my-books.service';
import { MyBooksController } from './my-books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyBook } from './entities/my-book.entity';
import { ReadingStatistic } from '../reading-statistics/entities/reading-statistic.entity';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([MyBook, ReadingStatistic, User]),
    JwtModule.register({}),
  ],
  controllers: [MyBooksController],
  providers: [MyBooksService],
})
export class MyBooksModule {}
