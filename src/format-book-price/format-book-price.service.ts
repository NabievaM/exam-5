import { Injectable } from '@nestjs/common';
import { CreateFormatBookPriceDto } from './dto/create-format-book-price.dto';
import { UpdateFormatBookPriceDto } from './dto/update-format-book-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormatBookPrice } from './entities/format-book-price.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormatBookPriceService {
  constructor(
    @InjectRepository(FormatBookPrice)
    private readonly formatBookPriceRepo: Repository<FormatBookPrice>,
  ) {}
  create(createFormatBookPriceDto: CreateFormatBookPriceDto) {
    return this.formatBookPriceRepo.save(createFormatBookPriceDto);
  }

  findAll(): Promise<FormatBookPrice[]> {
    return this.formatBookPriceRepo.find({ relations: ['book'] });
  }

  findOne(id: number): Promise<FormatBookPrice> {
    return this.formatBookPriceRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFormatBookPriceDto: UpdateFormatBookPriceDto,
  ): Promise<FormatBookPrice> {
    await this.formatBookPriceRepo.update(
      { id },
      { ...updateFormatBookPriceDto },
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.formatBookPriceRepo.delete({ id });
    return id;
  }
}
