import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Purposes {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  purpose: string;
}
