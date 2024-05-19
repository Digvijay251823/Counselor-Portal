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
import { Counselee } from './Counselee.entity';
import { Counselor } from './Counselor.entity';

@Entity()
export class CounselorProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Counselee)
  @JoinColumn()
  counselee: Counselee;
  @ManyToOne(() => Counselor, { nullable: true })
  @JoinColumn()
  preferedCounselor1: Counselor;
  @ManyToOne(() => Counselor, { nullable: true })
  @JoinColumn()
  preferedCounselor2: Counselor;
  @ManyToOne(() => Counselor, { nullable: true })
  @JoinColumn()
  preferedCounselor3: Counselor;
  @Column()
  reasonForCounselorChange: string;
  @Column({ default: false })
  alreadySpokenToExistingCounselor: boolean;
  @Column({ default: false })
  alreadySpokenToNewCounselor: boolean;
  @Column({ default: 'PENDING' })
  statusOfChange: 'APPROVED' | 'PENDING';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
