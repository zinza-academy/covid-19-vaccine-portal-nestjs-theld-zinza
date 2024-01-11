import { IsString, MaxLength } from 'class-validator';

export class CreateVaccineTypeDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  batchNumber: string;
}
