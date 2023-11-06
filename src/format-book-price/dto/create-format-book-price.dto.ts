import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormatBookPriceDto {
  @ApiProperty({
    example: '100.000',
    description: 'Book`s price',
  })
  @IsNotEmpty()
  @IsString()
  price: string;
}
