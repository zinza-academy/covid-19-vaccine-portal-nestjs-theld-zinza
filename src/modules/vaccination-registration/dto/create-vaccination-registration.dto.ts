import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVaccinationRegistrationDto {
  userId: number;

  @IsString()
  @MaxLength(255)
  job: string;

  @IsString()
  @MaxLength(255)
  workplace: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @MaxLength(10)
  @IsDateString()
  @IsNotEmpty()
  injectionDate: string;

  @IsNumber()
  @IsNotEmpty()
  injectionPhase: number;

  @IsString()
  @MaxLength(255)
  insuranceCode: string;
}
