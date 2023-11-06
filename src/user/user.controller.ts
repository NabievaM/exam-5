import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Tokens } from '../types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.userService.signup(userDto, res);
  }

  @Public()
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, type: User })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.userService.signin(loginUserDto, res);
  }

  @ApiOperation({ summary: 'Logout User' })
  @ApiResponse({ status: 200, type: User })
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.userService.signout(userId, res);
  }

  @Public()
  @ApiOperation({ summary: 'Refresh User Token' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.userService.refreshTokens(userId, refreshToken, res);
  }

  @ApiOperation({ summary: 'FindAll User' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('find')
  @HttpCode(HttpStatus.OK)
  async findAll(@GetCurrentUserId() userId: number) {
    return this.userService.findAll(userId);
  }
}
