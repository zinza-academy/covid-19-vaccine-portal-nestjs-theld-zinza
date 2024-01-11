import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineTypeDto } from './dto/create-vaccine-type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VaccineType } from 'src/entities/vaccine-type.entity';
import { vaccineTypeSearchParams } from './vaccine-type.controller';

@Injectable()
export class VaccineTypeService {
  constructor(
    @InjectRepository(VaccineType)
    private VaccineTypeRepository: Repository<VaccineType>,
  ) {}

  async create(data: CreateVaccineTypeDto) {
    const place = this.VaccineTypeRepository.create(data);

    return await this.VaccineTypeRepository.save(place);
  }

  async paginate(options: vaccineTypeSearchParams) {
    const [items, total] = await this.VaccineTypeRepository.findAndCount({
      take: options.limit || 10,
      skip: (options.page || 0) * (options.limit || 10),
    });

    return { items, total };
  }

  async getAll() {
    return await this.VaccineTypeRepository.find();
  }

  async findOne(id: number) {
    const result = await this.VaccineTypeRepository.findOneBy({
      id,
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(id: number, data: UpdateVaccineTypeDto) {
    await this.VaccineTypeRepository.update({ id }, data);
    const result = await this.findOne(id);

    return result;
  }

  async remove(id: number) {
    const place = await this.findOne(id);
    const result = await this.VaccineTypeRepository.remove(place);

    return !!result;
  }
}
