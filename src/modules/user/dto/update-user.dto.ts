import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { GENDER } from 'src/entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @MaxLength(50)
  fullName: string;

  @MaxLength(10)
  @IsDateString()
  birthday: string;

  @IsEnum(GENDER)
  gender: GENDER;

  @IsNumber()
  wardId: number;
}
