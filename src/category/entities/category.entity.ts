import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('category')
export class Category {
  @ApiProperty({
    example: '1',
    description: 'Category Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Timurid period',
    description: 'category name',
  })
  @Column()
  name: string;

  @OneToMany(() => Book, (books) => books.category)
  books: Book[];
}
