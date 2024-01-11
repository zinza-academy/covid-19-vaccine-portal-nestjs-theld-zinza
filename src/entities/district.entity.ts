import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ward } from './ward.entity';
import { Province } from './province.entity';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('int')
  provinceId: number;

  @OneToMany(() => Ward, (wards) => wards.district)
  wards: Ward[];

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;
}
