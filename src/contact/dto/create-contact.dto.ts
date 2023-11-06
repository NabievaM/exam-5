import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    example: '@junior',
    description: 'Telegram link',
  })
  @IsNotEmpty()
  @IsString()
  telegram_link: string;

  @ApiProperty({
    example: 'mukhlis@gmail.com',
    description: 'Email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'elektron_library',
    description: 'Instagram profile',
  })
  @IsNotEmpty()
  @IsString()
  instagram: string;

  @ApiProperty({
    example: 'elektron_library',
    description: 'Facebook profile',
  })
  @IsNotEmpty()
  @IsString()
  facebook: string;
}
