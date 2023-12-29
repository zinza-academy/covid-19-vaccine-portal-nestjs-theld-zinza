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

@Injectable()
export class AuthService {
  constructor(
    protected userService: UserService,
    protected jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExist = await this.userService.findOneByEmail(createUserDto.email);

    if (isExist) {
      throw new BadRequestException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.userService.create(createUserDto);

    return user;
  }

  async login(payload: LoginDto) {
    const user = await this.userService.findOneByEmail(payload.email);

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
}
