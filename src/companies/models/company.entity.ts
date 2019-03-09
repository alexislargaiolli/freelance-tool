import { Address } from '@common/address.entity';
import { User } from '@users/models/user.entity';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested, IsEmail, IsPhoneNumber } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';
import { CrudValidate } from '@nestjsx/crud';
import { Invoice } from '@invoice/models/invoice.entity';
import { Quotation } from '@quotation/models/quotation.entity';
import { Customer } from '@customers/models/customer.entity';
import { TaxReturn } from 'tax-return/models/tax-return.entity';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column()
    name: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsEmail({}, { always: true })
    @Column({ nullable: true })
    email: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsPhoneNumber('fr', { always: true })
    @Column({ nullable: true })
    phone: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MinLength(14, { always: true })
    @MaxLength(14, { always: true })
    @Column({ nullable: true })
    siret: string;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @Type((t) => Address)
    @ValidateNested({ always: true })
    @OneToOne(type => Address, { cascade: true, eager: true })
    @JoinColumn()
    facturationAddress: Address;

    @Column({ nullable: false })
    bossId: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ManyToOne(type => User, user => user.companies)
    boss: User;

    @OneToMany(type => Invoice, invoice => invoice.company)
    invoices: Invoice[];

    @OneToMany(type => Quotation, quotation => quotation.company)
    quotations: Quotation[];

    @OneToMany(type => Customer, customer => customer.company)
    customers: Customer[];

    @OneToMany(type => TaxReturn, taxReturn => taxReturn.company)
    taxReturns: TaxReturn[];

}
