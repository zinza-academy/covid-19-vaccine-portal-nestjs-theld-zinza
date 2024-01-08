import { IsNotEmpty } from '@nestjs/class-validator';
import { IsString, MinLength } from 'class-validator';

export class UserUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  rePassword: string;
}
