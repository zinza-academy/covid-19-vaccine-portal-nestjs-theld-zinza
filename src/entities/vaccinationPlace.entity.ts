import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaccinationPlace')
export class VaccinationPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column('int')
  wardId: number;

  @Column({ length: 255 })
  managerName: string;

  @Column('int')
  tableAvailable: number;
}
