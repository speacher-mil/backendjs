import { Purposes } from '@/purposes/entities/purposes.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    email: string

    @ManyToMany(type => Purposes)
    @JoinTable()
    purposes: Purposes[];
}
