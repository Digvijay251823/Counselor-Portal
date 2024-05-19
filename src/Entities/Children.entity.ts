import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
  // Other properties as needed
}
