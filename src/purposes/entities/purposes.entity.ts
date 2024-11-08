import { User } from '@/users/entities/users.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purposes {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    purpose: string

}
