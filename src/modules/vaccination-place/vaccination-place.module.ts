import { Module } from '@nestjs/common';
import { VaccinationPlaceService } from './vaccination-place.service';
import { VaccinationPlaceController } from './vaccination-place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationPlace } from 'src/entities/vaccinationPlace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationPlace])],
  controllers: [VaccinationPlaceController],
  providers: [VaccinationPlaceService],
})
export class VaccinationPlaceModule {}
