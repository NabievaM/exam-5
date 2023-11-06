import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserWalletDto {
  @ApiProperty({
    example: 'Humo',
    description: 'Card name',
  })
  @IsNotEmpty()
  @IsString()
  card_name: string;

  @ApiProperty({
    example: '1234432112344321',
    description: 'Card number',
  })
  @IsNotEmpty()
  @IsString()
  card_number: string;
}
