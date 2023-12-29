import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: CreateUserDto) {
    const result = await this.userService.create(data);

    return { data: result };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await this.authService.login(data);
    response.cookie('access_token', token);

    return user;
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '');

    return null;
  }
}
