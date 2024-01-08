import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccinationPlaceDto } from './dto/create-vaccination-place.dto';
import { UpdateVaccinationPlaceDto } from './dto/update-vaccination-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { VaccinationPlace } from 'src/entities/vaccinationPlace.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
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

  async paginate(
    options: vaccinationPlaceSearchParams,
  ): Promise<Pagination<VaccinationPlace>> {
    const search = (options.name || options.address) && {
      where: [
        { name: ILike(`%${options.name}%`) },
        { address: ILike(`%${options.address}%`) },
      ],
    };

    return paginate<VaccinationPlace>(
      this.VaccinationPlaceRepository,
      options,
      search,
    );
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
