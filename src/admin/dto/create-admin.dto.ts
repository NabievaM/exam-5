import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Muhlisaxon',
    description: 'Admin name',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Nabieva',
    description: 'Admin lastname',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin`s phone number',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: '@junior',
    description: 'Admin`s telegram link',
  })
  @IsNotEmpty()
  @IsString()
  tg_link: string;

  @ApiProperty({
    example: 'mukhlis@gmail.com',
    description: 'Admin`s email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin`s password',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
