import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn, // Import the necessary decorators
} from 'typeorm';
import { NextFunction } from 'express';
import { Child } from './Children.entity';

const JWT_SECRET = process.env.JWT_TOKEN;

@Entity()
export class Counselor {
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

  @Column({ nullable: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ default: 'UNMARRIED' })
  maritalStatus: string;

  // Define the relationship with another Counselor entity
  @OneToOne(() => Counselor, { nullable: true })
  @JoinColumn()
  husband: Counselor;

  @Column()
  address: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  chantingRounds: number;

  @Column({ nullable: true })
  chantingStartedThisRoundsDate: Date;

  @Column({ nullable: true })
  yourInitiatingSpiritualMaster: string;

  @Column({ nullable: true })
  harinamInitiationDate: Date;

  @Column({ nullable: true })
  harinamInitiationPlace: string;
  @ManyToOne(() => Child, { nullable: true })
  children: Child[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async getJWTToken() {
    return jwt.sign(this.id, JWT_SECRET, { expiresIn: '15d' });
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(next: NextFunction) {
    if (this.password) {
      if (this.isModified('password')) {
        const Counselor = this as Counselor;
        const saltRounds = 10;
        try {
          const salted = await bcrypt.genSalt(saltRounds);
          const encrypted = await bcrypt.hash(Counselor.password, salted);
          this.password = encrypted;
          next();
        } catch (error) {
          next(error);
        }
      }
    }
  }

  private isModified(property: string): boolean {
    return this['_' + property] !== undefined;
  }
}
