import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccinationPlaceDto } from './create-vaccination-place.dto';

export class UpdateVaccinationPlaceDto extends PartialType(
  CreateVaccinationPlaceDto,
) {}
