import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('author')
export class Author {
  @ApiProperty({
    example: '1',
    description: 'Author Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Alisher',
    description: 'Author`s name',
  })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({
    example: 'Navoi',
    description: 'Author`s lastname',
  })
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({
    example:
      'Тюркский поэт, суфий, государственный деятель тимуридского Хорасана.',
    description: 'Author`s bio',
  })
  @Column({ nullable: true })
  bio: string;

  @ApiProperty({
    example: 'Афганистан',
    description: 'Author`s country',
  })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({
    example: '9 февраля 1441 г',
    description: 'Author`s date birth',
  })
  @Column({ nullable: true })
  date_of_birth: string;

  @ApiProperty({
    example: '3 января 1501 г.',
    description: 'Author`s date death',
  })
  @Column({ nullable: true })
  date_of_death: string;

  @OneToMany(() => Book, (books) => books.author)
  books: Book[];
}
