import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateVaccinationRegistrationDto } from './dto/create-vaccination-registration.dto';
import { UpdateVaccinationRegistrationDto } from './dto/update-vaccination-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccinationRegistration } from 'src/entities/vaccinationRegistration.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { vaccinationRegistrationSearchParams } from './vaccination-registration.controller';

@Injectable({ scope: Scope.REQUEST })
export class VaccinationRegistrationService {
  constructor(
    @InjectRepository(VaccinationRegistration)
    private VaccinationRegistrationRepository: Repository<VaccinationRegistration>,
  ) {}

  async create(data: CreateVaccinationRegistrationDto) {
    const registration = this.VaccinationRegistrationRepository.create(data);

    return await this.VaccinationRegistrationRepository.save(registration);
  }

  async findAll(
    options: vaccinationRegistrationSearchParams,
    userId?: number,
  ): Promise<Pagination<VaccinationRegistration>> {
    const search = {
      ...(userId && { where: [{ userId }] }),
      relations: ['user', 'place'],
    };

    return paginate<VaccinationRegistration>(
      this.VaccinationRegistrationRepository,
      options,
      search,
    );
  }

  async findOne(id: number) {
    const result = await this.VaccinationRegistrationRepository.findOneBy({
      id,
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(id: number, data: UpdateVaccinationRegistrationDto) {
    await this.VaccinationRegistrationRepository.update({ id }, data);
    const result = await this.findOne(id);

    return result;
  }
}
