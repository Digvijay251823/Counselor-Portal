import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Counselor } from './Counselor.entity';
import { Child } from './Children.entity';

@Entity()
export class Counselee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true })
  initiatedName: string;
  @Column()
  phoneNumber: string;
  @Column()
  gender: string;
  @Column()
  age: number;
  @Column()
  email: string;
  @Column({ default: 'UNMARRIED' })
  maritalStatus: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  profession: string;
  @Column({ nullable: true })
  yourInitiatingSpiritualMaster: string;
  @Column({ nullable: true })
  harinamInitiationDate: Date;
  @Column({ nullable: true })
  harinamInitiationPlace: string;
  @Column({ nullable: true })
  chantingRounds: number;
  @Column({ nullable: true })
  chantingStartedThisRoundsDate: Date;
  @Column({ nullable: true })
  recommendedBy: string;
  @ManyToOne(() => Counselor, { nullable: true })
  @JoinColumn()
  currentCounselor: Counselor;
  @Column({ nullable: true })
  connectedToCounselorSinceYear: Date;
  @OneToOne(() => Counselee, { nullable: true })
  @JoinColumn()
  husband: Counselee;
  @ManyToOne(() => Child, { nullable: true })
  children: Child[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
