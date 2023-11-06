import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}
  create(createLikeDto: CreateLikeDto) {
    return this.likeRepo.save(createLikeDto);
  }

  findAll(): Promise<Like[]> {
    return this.likeRepo.find({ relations: ['user', 'book'] });
  }

  findOne(id: number): Promise<Like> {
    return this.likeRepo.findOne({ where: { id } });
  }

  async update(id: number, updateLikeDto: UpdateLikeDto): Promise<Like> {
    await this.likeRepo.update({ id }, { ...updateLikeDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.likeRepo.delete({ id });
    return id;
  }
}
