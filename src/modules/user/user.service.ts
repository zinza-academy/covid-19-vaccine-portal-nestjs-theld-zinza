import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { userSearchParams } from './user.controller';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

type FindUserCondition = {
  id?: number;
  email?: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll(options: userSearchParams): Promise<Pagination<User>> {
    const search = (options.name || options.citizenCode) && {
      where: [
        { name: ILike(`%${options.name}%`) },
        { citizenCode: ILike(`%${options.citizenCode}%`) },
      ],
    };

    return paginate<User>(this.userRepository, options, search);
  }

  async findOne(condition: FindUserCondition, getPassword: boolean = false) {
    const result = this.userRepository
      .createQueryBuilder('user')
      .where(condition)
      .addSelect([getPassword ? 'user.password' : null])
      .getOne();

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id }, updateUserDto);
    const result = await this.findOne({ id });

    return result;
  }

  async updatePassword(id: number, password: string) {
    await this.userRepository.update({ id }, { password });
    const result = await this.findOne({ id });

    return result;
  }

  async remove(id: number) {
    const user = await this.findOne({ id });
    const result = await this.userRepository.remove(user);

    return result;
  }

  async getCert(id: number) {
    const result = await this.userRepository.findOne({
      where: { id },
      relations: ['ward.district.province', 'registrations.vaccineType'],
    });

    return result;
  }
}
