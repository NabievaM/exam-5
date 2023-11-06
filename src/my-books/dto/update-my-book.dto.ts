import { PartialType } from '@nestjs/swagger';
import { CreateMyBookDto } from './create-my-book.dto';

export class UpdateMyBookDto extends PartialType(CreateMyBookDto) {}
