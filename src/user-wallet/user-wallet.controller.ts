import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { CreateUserWalletDto } from './dto/create-user-wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user-wallet.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('User Wallet')
@Controller('user-wallet')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @ApiOperation({ summary: 'create user-wallet' })
  @UseGuards(UserGuard)
  @Post('create')
  create(@Body() createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletService.create(createUserWalletDto);
  }

  @ApiOperation({ summary: 'find all user-wallets' })
  @Get('findAll')
  findAll() {
    return this.userWalletService.findAll();
  }

  @ApiOperation({ summary: 'find by id user-wallet' })
  @UseGuards(UserSelfGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.userWalletService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit user-wallet' })
  @UseGuards(UserSelfGuard)
  @Patch('edit/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserWalletDto: UpdateUserWalletDto,
  ) {
    return this.userWalletService.update(+id, updateUserWalletDto);
  }

  @ApiOperation({ summary: 'delete user-wallet' })
  @UseGuards(UserSelfGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userWalletService.remove(+id);
  }
}
