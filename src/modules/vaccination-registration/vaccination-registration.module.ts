import { Module } from '@nestjs/common';
import { VaccinationRegistrationService } from './vaccination-registration.service';
import { VaccinationRegistrationController } from './vaccination-registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationRegistration } from 'src/entities/vaccinationRegistration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationRegistration])],
  controllers: [VaccinationRegistrationController],
  providers: [VaccinationRegistrationService],
})
export class VaccinationRegistrationModule {}
