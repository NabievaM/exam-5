import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

export enum Format {
  HardCover = 'Hard Cover',
  ThinSheet = 'Thin Sheet',
  Audio = 'Audio',
  Free = 'Free',
}

@Entity('format-book-price')
export class FormatBookPrice {
  @ApiProperty({
    example: '1',
    description: 'FormatBookPrice Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Hard cover book',
    description: 'Format book',
  })
  @Column({
    type: 'enum',
    enum: Format,
    default: Format.Free,
  })
  format: Format;

  @ApiProperty({ example: '100.000', description: 'Book`s price' })
  @Column()
  price: string;

  @ManyToOne(() => Book, (book) => book.formatBook)
  book: Book;
}
