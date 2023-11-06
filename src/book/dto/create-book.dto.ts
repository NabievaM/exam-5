import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: 'Xamsa',
    description: 'Book`s title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '400',
    description: 'Book`s pages',
  })
  @IsNotEmpty()
  @IsString()
  pages: string;

  @ApiProperty({
    example: 'Turkish',
    description: 'What language is the book written in?',
  })
  @IsNotEmpty()
  @IsString()
  language: string;

  @ApiProperty({
    example: '30',
    description: 'Book`s count',
  })
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @ApiProperty({
    example: '1989',
    description: 'What year was the book published?',
  })
  @IsNotEmpty()
  @IsString()
  year: string;

  @ApiProperty({
    example: '3 января',
    description: 'What day was the book published?',
  })
  @IsNotEmpty()
  @IsString()
  date_of_publication: string;

  @ApiProperty({
    example:
      'Хамса — произведение тимуридского поэта Алишера Навои, написанное им в XV веке на чагатайском языке.',
    description: 'About Book',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Feruza Xoliqova ...',
    description: 'Publisher name',
  })
  @IsNotEmpty()
  @IsString()
  publisher: string;
}
