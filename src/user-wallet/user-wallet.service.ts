import { Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user-wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWallet } from './entities/user-wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectRepository(UserWallet)
    private readonly userWalletRepo: Repository<UserWallet>,
  ) {}
  create(createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletRepo.save(createUserWalletDto);
  }

  findAll(): Promise<UserWallet[]> {
    return this.userWalletRepo.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<UserWallet> {
    return this.userWalletRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUserWalletDto: UpdateUserWalletDto,
  ): Promise<UserWallet> {
    await this.userWalletRepo.update({ id }, { ...updateUserWalletDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.userWalletRepo.delete({ id });
    return id;
  }
}
