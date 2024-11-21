import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Purposes } from '@/users/purposes/entities/purposes.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  email: string;

  @ManyToMany((type) => Purposes)
  @JoinTable()
  purposes: (Purposes | null)[];
}
