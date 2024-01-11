import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateVaccinationRegistrationDto } from './dto/create-vaccination-registration.dto';
import { UpdateVaccinationRegistrationDto } from './dto/update-vaccination-registration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { VaccinationRegistration } from 'src/entities/vaccinationRegistration.entity';
import { vaccinationRegistrationSearchParams } from './vaccination-registration.controller';

@Injectable({ scope: Scope.REQUEST })
export class VaccinationRegistrationService {
  constructor(
    @InjectRepository(VaccinationRegistration)
    private VaccinationRegistrationRepository: Repository<VaccinationRegistration>,
  ) {}

  async create(data: CreateVaccinationRegistrationDto) {
    const registration = this.VaccinationRegistrationRepository.create(data);

    const result =
      await this.VaccinationRegistrationRepository.save(registration);

    return await this.VaccinationRegistrationRepository.findOne({
      where: { id: result.id },
      relations: ['user', 'user.ward.district.province'],
    });
  }

  async findAll(options: vaccinationRegistrationSearchParams, userId?: number) {
    const [items, total] =
      await this.VaccinationRegistrationRepository.findAndCount({
        take: options.limit || 10,
        skip: (options.page || 0) * (options.limit || 10),
        where: {
          user: {
            id: userId,
            fullName: options.name ? ILike(`%${options.name}%`) : undefined,
            citizenCode: options.citizenCode
              ? ILike(`%${options.citizenCode}%`)
              : undefined,
          },
        },
        order: {
          id: 'DESC',
        },
        relations: {
          user: {},
        },
      });

    return { items, total };
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
