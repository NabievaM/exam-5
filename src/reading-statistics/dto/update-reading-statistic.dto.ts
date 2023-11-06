import { PartialType } from '@nestjs/swagger';
import { CreateReadingStatisticDto } from './create-reading-statistic.dto';

export class UpdateReadingStatisticDto extends PartialType(CreateReadingStatisticDto) {}
