import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';
import { User } from './user.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('int')
  districtId: number;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;

  @OneToMany(() => User, (users) => users.ward)
  users: User[];
}
