import { User } from 'src/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
import { ForgotPasswordDto } from './dto/forgotPassword';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { ForgotPasswordToken } from 'src/entities/forgotPasswordToken.entity';
import { v4 as uuid } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword';
import { UserUpdatePasswordDto } from './dto/userUpdatePassword';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ForgotPasswordToken)
    protected forgotPasswordRepository: Repository<ForgotPasswordToken>,
    protected userService: UserService,
    protected jwtService: JwtService,
    protected mailService: MailService,
  ) {}

  async register(data: CreateUserDto) {
    const isExist = await this.userService.findOne({
      email: data.email,
    });

    if (isExist) {
      throw new BadRequestException('Email already exists');
    }

    data.password = await this.createHashedPassword(data.password);
    const user = await this.userService.create(data);
    delete user.password;

    return user;
  }

  async login(payload: LoginDto) {
    const user = await this.userService.findOne({ email: payload.email }, true);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    const { password, ...result } = user;

    return {
      user: result,
      token,
    };
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    const user = await this.userService.findOne({ email: payload.email }, true);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const token = uuid();
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const fpwToken = this.forgotPasswordRepository.create({
      token: token,
      createdAt: now,
    });

    fpwToken.user = user;
    await this.forgotPasswordRepository.save(fpwToken);

    await this.mailService.sendUserForgotPasswordMail(user, token);

    return true;
  }

  async updatePassword(payload: UpdatePasswordDto) {
    const result = await this.forgotPasswordRepository.findOne({
      where: {
        token: payload.token,
      },
    });

    if (!result) {
      throw new BadRequestException('Invalid token');
    }

    const user = await this.userService.findOne({ id: result.userId }, true);

    if (payload.password != payload.rePassword) {
      throw new BadRequestException(
        'Password and retype password do not match',
      );
    }

    const newPassword = await this.createHashedPassword(payload.password);
    this.userService.updatePassword(user.id, newPassword);
    this.forgotPasswordRepository.remove(result);

    return true;
  }

  async createHashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    return password;
  }

  async useUpdatePassword(userId: number, payload: UserUpdatePasswordDto) {
    if (payload.password != payload.rePassword) {
      throw new BadRequestException(
        'Password and retype password do not match',
      );
    }

    const newPassword = await this.createHashedPassword(payload.password);
    this.userService.updatePassword(userId, newPassword);

    return true;
  }
}
