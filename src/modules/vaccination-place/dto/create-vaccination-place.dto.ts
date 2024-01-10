import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateVaccinationPlaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  @MaxLength(255)
  managerName: string;

  @IsNumber()
  tableAvailable: number;
}
