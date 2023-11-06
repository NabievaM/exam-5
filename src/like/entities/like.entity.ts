import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Book } from '../../book/entities/book.entity';

@Entity('likes')
export class Like {
  @ApiProperty({
    example: '1',
    description: 'Likes Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.like)
  user: User;

  @ManyToOne(() => Book, (book) => book.like)
  book: Book;
}
