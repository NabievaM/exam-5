import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    example: 'Good',
    description: 'Comment',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
