import { Injectable } from '@nestjs/common';
import { CreateReadingStatisticDto } from './dto/create-reading-statistic.dto';
import { UpdateReadingStatisticDto } from './dto/update-reading-statistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadingStatistic } from './entities/reading-statistic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReadingStatisticService {
  constructor(
    @InjectRepository(ReadingStatistic)
    private readonly readingStatisticRepo: Repository<ReadingStatistic>,
  ) {}
  create(createReadingStatisticDto: CreateReadingStatisticDto) {
    return this.readingStatisticRepo.save(createReadingStatisticDto);
  }

  findAll(): Promise<ReadingStatistic[]> {
    return this.readingStatisticRepo.find({ relations: ['book', 'user'] });
  }

  findOne(id: number): Promise<ReadingStatistic> {
    return this.readingStatisticRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateReadingStatisticDto: UpdateReadingStatisticDto,
  ): Promise<ReadingStatistic> {
    await this.readingStatisticRepo.update(
      { id },
      { ...updateReadingStatisticDto },
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.readingStatisticRepo.delete({ id });
    return id;
  }
}
