import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { User } from '../../user/entities/user.entity';
import { MyBook } from '../../my-books/entities/my-book.entity';

export enum Statistic {
  ReadNow = 'I`m reading now',
  WantRead = 'I want read',
  FinishedRead = 'I finished read',
}

@Entity('reading-statistic')
export class ReadingStatistic {
  @ApiProperty({
    example: '1',
    description: 'ReadingStatistic Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'I finished read',
    description: 'Reading Statistic',
  })
  @Column({
    type: 'enum',
    enum: Statistic,
    default: Statistic.ReadNow,
  })
  reading_statistic: Statistic;

  @ManyToOne(() => Book, (book) => book.statistic)
  book: Book;

  @ManyToOne(() => User, (user) => user.statistic)
  user: User;

  @OneToMany(() => MyBook, (mybook) => mybook.statistic)
  mybook: MyBook[];
}
