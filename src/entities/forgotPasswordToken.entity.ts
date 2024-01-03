import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('forgotPasswordToken')
export class ForgotPasswordToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column({ length: 255 })
  token: string;

  @Column({
    type: 'datetime',
  })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.fpwToken)
  @JoinColumn({ name: 'userId' })
  user: User;
}
