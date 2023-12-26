import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { GENDER } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @MaxLength(10)
  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @IsEnum(GENDER)
  @IsNotEmpty()
  gender: GENDER;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(12)
  citizenCode: string;

  @IsNumber()
  @IsNotEmpty()
  provinceId: number;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  @IsNumber()
  @IsNotEmpty()
  wardId: number;

  @IsNumber({})
  role: number;
}
