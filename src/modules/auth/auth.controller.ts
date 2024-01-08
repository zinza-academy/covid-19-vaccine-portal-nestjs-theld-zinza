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
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgotPassword';
import { UpdatePasswordDto } from './dto/updatePassword';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ROLE, User } from 'src/entities/user.entity';
import { UserUpdatePasswordDto } from './dto/userUpdatePassword';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() data: CreateUserDto) {
    data.role = ROLE.user;
    const result = await this.authService.register(data);

    return result;
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
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '');

    return true;
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  getInfo(@CurrentUser() user: User) {
    return user;
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(data);

    return result;
  }

  @Put('forgot-password')
  @UsePipes(new ValidationPipe())
  async updateForgotPassword(@Body() data: UpdatePasswordDto) {
    const result = await this.authService.updatePassword(data);

    return result;
  }

  @Put('update-password')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePassword(
    @Body() updateUserDto: UserUpdatePasswordDto,
    @CurrentUser() user: User,
  ) {
    return this.authService.useUpdatePassword(user.id, updateUserDto);
  }
}
