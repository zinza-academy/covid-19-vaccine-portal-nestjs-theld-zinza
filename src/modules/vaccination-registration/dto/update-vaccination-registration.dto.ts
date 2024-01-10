import { IsDateString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class UpdateVaccinationRegistrationDto {
  @IsNumber()
  @IsOptional()
  vaccineTypeId: number;

  @IsNumber()
  @IsOptional()
  vaccinationPlaceId: number;

  @MaxLength(10)
  @IsDateString()
  @IsOptional()
  injectedDate: string;

  @IsNumber()
  @IsOptional()
  status: number;
}
