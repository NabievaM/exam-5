import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'Alisher',
    description: 'Author`s name',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Navoi',
    description: 'Author`s lastname',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example:
      'Тюркский поэт, суфий, государственный деятель тимуридского Хорасана.',
    description: 'Author`s bio',
  })
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty({
    example: 'Афганистан',
    description: 'Author`s country',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    example: ' 9 февраля 1441 г.',
    description: 'Author`s date birth',
  })
  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @ApiProperty({
    example: '3 января 1501 г.',
    description: 'Author`s date death',
  })
  @IsNotEmpty()
  @IsString()
  date_of_death: string;
}
