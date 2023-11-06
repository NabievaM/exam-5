import { PartialType } from '@nestjs/swagger';
import { CreateFormatBookPriceDto } from './create-format-book-price.dto';

export class UpdateFormatBookPriceDto extends PartialType(CreateFormatBookPriceDto) {}
