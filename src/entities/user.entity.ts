import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ForgotPasswordToken } from './forgotPasswordToken.entity';
import { VaccinationRegistration } from './vaccinationRegistration.entity';

export enum GENDER {
  male = 1,
  female = 2,
}

export enum ROLE {
  user = 0,
  admin = 1,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 20 })
  citizenCode: string;

  @Column({
    type: 'date',
  })
  birthday: string;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: number;

  @Column('int')
  wardId: number;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.user,
  })
  role: number;

  @OneToMany(() => ForgotPasswordToken, (fpwToken) => fpwToken.user)
  fpwToken: ForgotPasswordToken[];

  @OneToMany(() => VaccinationRegistration, (registration) => registration.user)
  registrations: VaccinationRegistration[];
}
