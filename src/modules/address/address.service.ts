import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Province } from 'src/entities/province.entity';
import { Repository } from 'typeorm';
import { District } from 'src/entities/district.entity';
import { Ward } from 'src/entities/ward.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private wardRepository: Repository<Ward>,
  ) {}

  async findAllProvince() {
    return await this.provinceRepository.find();
  }

  async findDistrict(id: number) {
    return await this.districtRepository.find({
      where: {
        provinceId: id,
      },
    });
  }

  async findWard(id: number) {
    return await this.wardRepository.find({
      where: {
        districtId: id,
      },
    });
  }
}
