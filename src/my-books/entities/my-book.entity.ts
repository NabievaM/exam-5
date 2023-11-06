import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReadingStatistic } from '../../reading-statistics/entities/reading-statistic.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('my-book')
export class MyBook {
  @ApiProperty({
    example: '1',
    description: 'MyBook Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReadingStatistic, (statistic) => statistic.mybook)
  statistic: ReadingStatistic;

  @ManyToOne(() => User, (user) => user.mybook)
  user: User;
}
