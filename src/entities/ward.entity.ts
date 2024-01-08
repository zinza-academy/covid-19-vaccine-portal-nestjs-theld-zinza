import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('int')
  districtId: number;
}
