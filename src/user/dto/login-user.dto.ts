import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'User`s email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User`s password',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
