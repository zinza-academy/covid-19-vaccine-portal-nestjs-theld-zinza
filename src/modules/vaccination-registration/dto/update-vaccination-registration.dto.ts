import { IsDateString, IsNumber, MaxLength } from 'class-validator';

export class UpdateVaccinationRegistrationDto {
  @IsNumber()
  vaccineTypeId: number;

  @IsNumber()
  vaccinationPlaceId: number;

  @MaxLength(10)
  @IsDateString()
  injectedDate: string;

  @IsNumber()
  status: number;
}
