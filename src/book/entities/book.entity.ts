import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Category } from '../../category/entities/category.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { FormatBookPrice } from '../../format-book-price/entities/format-book-price.entity';
import { ReadingStatistic } from '../../reading-statistics/entities/reading-statistic.entity';
import { Like } from '../../like/entities/like.entity';

@Entity('book')
export class Book {
  @ApiProperty({
    example: '1',
    description: 'Book Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Xamsa',
    description: 'Book`s title',
  })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({
    example: '400',
    description: 'Book`s pages',
  })
  @Column({ nullable: true })
  pages: string;

  @ApiProperty({
    example: 'Turkish',
    description: 'What language is the book written in?',
  })
  @Column({ nullable: true })
  language: string;

  @ApiProperty({
    example: '30',
    description: 'Book`s count',
  })
  @Column({ nullable: true })
  count: number;

  @ApiProperty({
    example: '1989',
    description: 'What year was the book published?',
  })
  @Column({ nullable: true })
  year: string;

  @ApiProperty({
    example: '3 января',
    description: 'What day was the book published?',
  })
  @Column({ nullable: true })
  date_of_publication: string;

  @ApiProperty({
    example:
      'Хамса — произведение тимуридского поэта Алишера Навои, написанное им в XV веке на чагатайском языке.',
    description: 'About Book',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: 'Feruza Xoliqova ...',
    description: 'Publisher name',
  })
  @Column({ nullable: true })
  publisher: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @OneToMany(() => Feedback, (feedback) => feedback.book)
  feedback: Feedback[];

  @OneToMany(() => FormatBookPrice, (formatBook) => formatBook.book)
  formatBook: FormatBookPrice[];

  @OneToMany(
    () => ReadingStatistic,
    (reading_statistic) => reading_statistic.book,
  )
  statistic: ReadingStatistic[];

  @OneToMany(() => Like, (like) => like.book)
  like: Like;
}
