import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { UserWalletModule } from './user-wallet/user-wallet.module';
import { ContactModule } from './contact/contact.module';
import { BookModule } from './book/book.module';
import { LikeModule } from './like/like.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FormatBookPriceModule } from './format-book-price/format-book-price.module';
import { ReadingStatisticsModule } from './reading-statistics/reading-statistics.module';
import { MyBooksModule } from './my-books/my-books.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    AdminModule,
    MailModule,
    UserModule,
    AuthorModule,
    CategoryModule,
    UserWalletModule,
    ContactModule,
    BookModule,
    LikeModule,
    FeedbackModule,
    FormatBookPriceModule,
    ReadingStatisticsModule,
    MyBooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
