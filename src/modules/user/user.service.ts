import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

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

  async findAll() {
    const result = await this.userRepository.find();

    return result;
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOneBy({
      id,
    });

    return result;
  }

  async findOneByEmail(email: string) {
    const result = await this.userRepository.findOneBy({
      email,
    });

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id }, updateUserDto);
    const result = await this.findOne(id);

    return result;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    const result = await this.userRepository.remove(user);

    return result;
  }
}
