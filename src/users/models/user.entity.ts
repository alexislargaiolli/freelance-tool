import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { Credential } from './credential.entity';
import { UserRole } from './user-roles.enum';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true, length: 150 })
    email: string;

    @OneToOne(type => Credential, credential => credential.user)
    credential?: Credential;

    @Column('simple-array')
    roles: UserRole[];

}
