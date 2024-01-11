import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccinationRegistration } from './vaccinationRegistration.entity';

@Entity('VaccineType')
export class VaccineType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  batchNumber: string;

  @OneToMany(
    () => VaccinationRegistration,
    (registration) => registration.vaccineType,
  )
  registrations: VaccinationRegistration[];
}
