import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('userWallet')
export class UserWallet {
  @ApiProperty({
    example: '1',
    description: 'UserWallet Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Humo',
    description: 'Card name',
  })
  @Column()
  card_name: string;

  @ApiProperty({
    example: '1234432112344321',
    description: 'Card number',
  })
  @Column()
  card_number: string;

  @ManyToOne(() => User, (user) => user.wallet)
  user: User;
}
