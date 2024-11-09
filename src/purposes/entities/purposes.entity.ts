import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@/users/entities/users.entity';

@Entity()
export class Purposes {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  purpose: string;
}
