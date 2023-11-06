import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Book } from '../../book/entities/book.entity';

@Entity('feedback')
export class Feedback {
  @ApiProperty({
    example: '1',
    description: 'Feedback Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Good book',
    description: 'comment',
  })
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.feedback)
  user: User;

  @ManyToOne(() => Book, (book) => book.feedback)
  book: Book;
}
