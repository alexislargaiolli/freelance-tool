import { Address } from '@common/address.entity';
import { User } from '@users/models/user.entity';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Type } from 'class-transformer';
import { CrudValidate } from '@nestjsx/crud';
import { Invoice } from '@invoice/models/invoice.entity';
import { Quotation } from '@quotation/models/quotation.entity';
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

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MinLength(14, { always: true })
    @MaxLength(14, { always: true })
    @Column()
    siret: string;

    @IsOptional({ groups: [UPDATE, CREATE] })
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

}
