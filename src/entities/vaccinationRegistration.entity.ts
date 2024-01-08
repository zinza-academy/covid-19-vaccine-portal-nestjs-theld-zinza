import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { VaccinationPlace } from './vaccinationPlace.entity';

@Entity('vaccinationRegistration')
export class VaccinationRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ length: 255, nullable: true })
  job: string;

  @Column({ length: 255, nullable: true })
  workplace: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({
    type: 'date',
  })
  injectionDate: string;

  @Column('int')
  injectionPhase: number;

  @Column({ type: 'int', nullable: true })
  vaccinationPlaceId: number;

  @Column({ type: 'int', nullable: true })
  vaccineTypeId: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  injectedDate: string;

  @Column({ length: 255, nullable: true })
  insuranceCode: string;

  @Column({ type: 'int', default: 0 })
  status: number;

  @ManyToOne(() => User, (user) => user.registrations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => VaccinationPlace, (place) => place.registrations)
  @JoinColumn({ name: 'vaccinationPlaceId' })
  place: VaccinationPlace;
}
