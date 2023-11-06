import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
  ) {}
  create(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackRepo.save(createFeedbackDto);
  }

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepo.find({ relations: ['user', 'book'] });
  }

  findOne(id: number): Promise<Feedback> {
    return this.feedbackRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    await this.feedbackRepo.update({ id }, { ...updateFeedbackDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.feedbackRepo.delete({ id });
    return id;
  }
}
