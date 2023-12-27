import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('int')
  provinceId: number;
}
