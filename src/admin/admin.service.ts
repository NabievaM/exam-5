import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { FindAdminDto } from './dto/find-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload, Tokens } from '../types';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(adminId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: adminId,
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
    adminId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.adminRepo.update(
      { id: adminId },
      { hashed_refresh_token: hashedRefreshToken },
    );
  }

  async signup(createAdminDto: CreateAdminDto, res: Response): Promise<Tokens> {
    const admin = await this.adminRepo.findOne({
      where: { email: createAdminDto.email },
    });

    if (admin) {
      throw new BadRequestException('Email already exists!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.save({
      ...createAdminDto,
      hashed_password: hashed_password,
    });

    const token = await this.getTokens(newAdmin.id, newAdmin.email);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);

    const uniqueKey: string = v4();

    await this.adminRepo.update(
      { id: newAdmin.id },
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
    );

    const updateAdmin = await this.adminRepo.find({
      where: { id: newAdmin.id },
    });
    console.log('update==', updateAdmin[0]);

    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 20 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendAdminConfirmation(updateAdmin[0]);
    } catch (error) {
      console.log(error);
    }
    return token;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    await this.adminRepo.update(
      { activation_link: link, is_active: false },
      { is_active: true },
    );
    const updateAdmin = await this.adminRepo.find({
      where: { activation_link: link },
    });

    if (!updateAdmin) {
      throw new BadRequestException('User already activated.');
    }

    const response = {
      message: 'Admin activated successfully',
      user: updateAdmin,
    };

    return response;
  }

  async signin(loginAdminDto: LoginAdminDto, res: Response): Promise<Tokens> {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }

    if (!admin.is_active) {
      throw new BadRequestException('admin is not active');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }

    const tokens = await this.getTokens(admin.id, admin.email);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const uniqueKey: string = v4();

    await this.adminRepo.update(
      { id: admin.id },
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
    );

    const updateAdmin = await this.adminRepo.find({
      where: { id: admin.id },
    });
    console.log('update==', updateAdmin[0]);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async signout(adminId: number, res: Response): Promise<boolean> {
    const updatedUser = await this.adminRepo.update(
      { id: adminId },
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
    const admin = await this.adminRepo.findOne({ where: { id: userId } });

    if (!admin || !admin.hashed_refresh_token)
      throw new ForbiddenException('Admin not found');

    const tokentMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!tokentMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(admin.id, admin.email);
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  async findAll(id: number) {
    const admin = await this.adminRepo.find({ where: { id: id } });
    return this.adminRepo.find();
  }
}
