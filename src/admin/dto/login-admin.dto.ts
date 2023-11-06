import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'Admin`s email',
  })
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
