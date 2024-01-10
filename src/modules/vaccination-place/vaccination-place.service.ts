import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationPlaceDto } from './dto/create-vaccination-place.dto';
import { UpdateVaccinationPlaceDto } from './dto/update-vaccination-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { VaccinationPlace } from 'src/entities/vaccinationPlace.entity';
import { vaccinationPlaceSearchParams } from './vaccination-place.controller';

@Injectable()
export class VaccinationPlaceService {
  constructor(
    @InjectRepository(VaccinationPlace)
    private VaccinationPlaceRepository: Repository<VaccinationPlace>,
  ) {}

  async create(data: CreateVaccinationPlaceDto) {
    const place = this.VaccinationPlaceRepository.create(data);

    return await this.VaccinationPlaceRepository.save(place);
  }

  async getAll() {
    return await this.VaccinationPlaceRepository.find();
  }

  async paginate(options: vaccinationPlaceSearchParams) {
    const [items, total] = await this.VaccinationPlaceRepository.findAndCount({
      take: options.limit || 10,
      skip: (options.page || 0) * (options.limit || 10),
      where: {
        name: options.name ? ILike(`%${options.name}%`) : undefined,
        address: options.address ? ILike(`%${options.address}%`) : undefined,
      },
    });

    return { items, total };
  }

  async findOne(id: number) {
    const result = await this.VaccinationPlaceRepository.findOneBy({
      id,
    });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(id: number, data: UpdateVaccinationPlaceDto) {
    await this.VaccinationPlaceRepository.update({ id }, data);
    const result = await this.findOne(id);

    return result;
  }

  async remove(id: number) {
    const place = await this.findOne(id);
    const result = await this.VaccinationPlaceRepository.remove(place);

    return !!result;
  }
}
