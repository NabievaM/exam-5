import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserWallet } from '../../user-wallet/entities/user-wallet.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
import { ReadingStatistic } from '../../reading-statistics/entities/reading-statistic.entity';
import { MyBook } from '../../my-books/entities/my-book.entity';
import { Like } from '../../like/entities/like.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: '1',
    description: 'User Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Muhlisaxon',
    description: 'User name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Nabieva',
    description: 'User lastname',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'User`s phone number',
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: 'mukhlis@gmail.com',
    description: 'User`s email',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User`s password',
  })
  @Column()
  hashed_password: string;

  @ApiProperty({
    example: 'urbygiruniyurrrry',
    description: 'Hashed refresh token',
  })
  @Column({ nullable: true })
  hashed_refresh_token: string;

  @OneToMany(() => UserWallet, (wallet) => wallet.user)
  wallet: UserWallet[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback[];

  @OneToMany(
    () => ReadingStatistic,
    (reading_statistic) => reading_statistic.user,
  )
  statistic: ReadingStatistic[];

  @OneToMany(() => MyBook, (mybook) => mybook.user)
  mybook: MyBook[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];
}
