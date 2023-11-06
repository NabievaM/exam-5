import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { LoginUserDto } from './dto/login-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload, Tokens } from '../types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.userRepo.update(
      { id: userId },
      { hashed_refresh_token: hashedRefreshToken },
    );
  }

  async signup(createUserDto: CreateUserDto, res: Response): Promise<Tokens> {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException('Email already exists!');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.save({
      ...createUserDto,
      hashed_password: hashed_password,
    });

    const token = await this.getTokens(newUser.id, newUser.email);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const uniqueKey: string = v4();

    await this.userRepo.update(
      { id: newUser.id },
      {
        hashed_refresh_token: hashed_refresh_token,
      },
    );

    const updateUser = await this.userRepo.find({
      where: { id: newUser.id },
    });
    console.log('update==', updateUser[0]);

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 20 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return token;
  }

  async signin(loginUserDto: LoginUserDto, res: Response): Promise<Tokens> {
    const { email, password } = loginUserDto;

    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('User not registered(pass)');
    }

    const tokens = await this.getTokens(user.id, user.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const uniqueKey: string = v4();

    await this.userRepo.update(
      { id: user.id },
      {
        hashed_refresh_token: hashed_refresh_token,
      },
    );

    const updateUser = await this.userRepo.find({
      where: { id: user.id },
    });
    console.log('update==', updateUser[0]);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signout(userId: number, res: Response): Promise<boolean> {
    const updatedUser = await this.userRepo.update(
      { id: userId },
      { hashed_refresh_token: null },
    );
    if (!updatedUser) throw new ForbiddenException('Access Denied');
    res.clearCookie('refresh_token');
    return true;
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user || !user.hashed_refresh_token)
      throw new ForbiddenException('Admin not found');

    const tokentMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokentMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async findAll(id: number) {
    const user = await this.userRepo.find({ where: { id: id } });
    return this.userRepo.find();
  }
}
