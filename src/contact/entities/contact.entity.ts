import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class Contact {
  @ApiProperty({
    example: '1',
    description: 'Contact Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number',
  })
  @Column()
  phone_number: string;

  @ApiProperty({
    example: '@junior',
    description: 'Telegram link',
  })
  @Column()
  telegram_link: string;

  @ApiProperty({
    example: 'mukhlis@gmail.com',
    description: 'Email',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'electron_library',
    description: 'Instagram profile',
  })
  @Column()
  instagram: string;

  @ApiProperty({
    example: 'electron_library',
    description: 'Facebook profile',
  })
  @Column()
  facebook: string;
}
