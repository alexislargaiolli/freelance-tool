import { Entity, PrimaryGeneratedColumn, OneToOne, Column, OneToMany, BaseEntity } from 'typeorm';
import { Credential } from './credential.entity';
import { UserRole } from './user-roles.enum';
import { Company } from '@companies/models/company.entity';
import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional } from 'class-validator';
import { CREATE, UPDATE } from '@nestjsx/crud';
import { Customer } from '@customers/models/customer.entity';
import { Quotation } from '@quotation/models/quotation.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column()
    firstname: string;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column()
    lastname: string;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @IsEmail({ require_tld: false }, { always: true })
    @Column({ unique: true, length: 150 })
    email: string;

    @OneToOne(type => Credential, credential => credential.user)
    credential?: Credential;

    @Column('simple-array')
    roles: UserRole[];

    @OneToMany(type => Company, company => company.boss)
    companies: Company[];

    @OneToMany(type => Customer, customer => customer.user)
    customers: Customer[];

    @OneToMany(type => Quotation, quotation => quotation.user)
    quotations: Quotation[];

}
