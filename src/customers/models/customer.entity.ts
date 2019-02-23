import { Address } from '@common/address.entity';
import { Company } from '@companies/models/company.entity';
import { CrudValidate } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested, IsEmail, IsPhoneNumber, Length } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column()
    name: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @MaxLength(100, { always: true })
    @Column({ nullable: true })
    firstname: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @MaxLength(100, { always: true })
    @Column({ nullable: true })
    lastname: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsEmail({}, { always: true })
    @Column({ nullable: true })
    email: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsPhoneNumber('fr', { always: true })
    @Column({ nullable: true })
    phone: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Length(14, 14, { always: true })
    @Column({ nullable: true })
    siret: string;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @Type(t => Address)
    @ValidateNested({ always: true })
    @OneToOne(type => Address, { cascade: true, eager: true })
    @JoinColumn()
    facturationAddress: Address;

    @Column({ nullable: false })
    companyId: number;

    @ManyToOne(type => Company, company => company.customers)
    company: Company;
}
