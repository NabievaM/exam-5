import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserWallet } from '../user-wallet/entities/user-wallet.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  AccessTokenStrategy,
  RefreshTokenFromCookieStrategy,
} from '../strategies';
import { AccessTokenGuard } from '../common/guards';
import { APP_GUARD } from '@nestjs/core';
import { UserWalletService } from '../user-wallet/user-wallet.service';
import { Feedback } from '../feedback/entities/feedback.entity';
import { FeedbackService } from '../feedback/feedback.service';
import { MyBook } from '../my-books/entities/my-book.entity';
import { MyBooksService } from '../my-books/my-books.service';
import { Like } from '../like/entities/like.entity';
import { LikeService } from '../like/like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserWallet, Feedback, MyBook, Like]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserWalletService,
    FeedbackService,
    AccessTokenStrategy,
    RefreshTokenFromCookieStrategy,
    MyBooksService,
    LikeService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class UserModule {}
