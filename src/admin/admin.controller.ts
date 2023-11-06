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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Tokens } from '../types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './entities/admin.entity';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { LoginAdminDto } from './dto/login-admin.dto';
import { FindAdminDto } from './dto/find-admin.dto';

@ApiTags('Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @ApiOperation({ summary: 'register admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() authDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.adminService.signup(authDto, res);
  }

  @Public()
  @ApiOperation({ summary: 'activate admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @Public()
  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.adminService.signin(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.adminService.signout(userId, res);
  }

  @Public()
  @ApiOperation({ summary: 'Refresh Admin Token' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() adminId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    return this.adminService.refreshTokens(adminId, refreshToken, res);
  }

  @ApiOperation({ summary: 'FindAll Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('find')
  @HttpCode(HttpStatus.OK)
  async findAll(@GetCurrentUserId() userId: number) {
    return this.adminService.findAll(userId);
  }
}
