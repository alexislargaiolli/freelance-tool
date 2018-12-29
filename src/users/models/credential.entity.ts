import { User } from './user.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Credential {

    @PrimaryColumn({ length: 100 })
    username: string;

    @Column()
    password: string;

    @OneToOne(type => User, user => user.credential)
    @JoinColumn()
    user: User;
}
