import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccinationRegistration } from './vaccinationRegistration.entity';

@Entity('vaccinationPlace')
export class VaccinationPlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 255 })
  managerName: string;

  @Column('int')
  tableAvailable: number;

  @OneToMany(() => VaccinationRegistration, (registration) => registration.user)
  registrations: VaccinationRegistration[];
}
