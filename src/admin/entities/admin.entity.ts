import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @ApiProperty({
    example: '1',
    description: 'Admin Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Muhlisaxon',
    description: 'Admin name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Nabieva',
    description: 'Admin lastname',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin`s phone number',
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: '@junior',
    description: 'Admin`s telegram link',
  })
  @Column()
  tg_link: string;

  @ApiProperty({
    example: 'mukhlis@gmail.com',
    description: 'Admin`s email',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin`s password',
  })
  @Column()
  hashed_password: string;

  @ApiProperty({
    example: 'urbygiruniyurrrry',
    description: 'Hashed refresh token',
  })
  @Column({ nullable: true })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'false',
    description: 'Admin tasdiqlangan holati',
  })
  @Column({ nullable: true })
  is_active: boolean;

  @ApiProperty({
    example: 'True',
    description: 'Activate link',
  })
  @Column({ nullable: true })
  activation_link: string;
}
