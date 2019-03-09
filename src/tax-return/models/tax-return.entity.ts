import { Company } from '@companies/models/company.entity';
import { CrudValidate } from '@nestjsx/crud';
import { IsOptional, Min, Max } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaxReturnType } from './tax-return-type.enum';
import { Invoice } from '@invoice/models/invoice.entity';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class TaxReturn extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({ nullable: true })
    date: Date;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({ nullable: true })
    periodStartDate: Date;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({ nullable: true })
    periodEndDate: Date;

    @Column({
        type: 'enum',
        enum: TaxReturnType,
        default: TaxReturnType.MONTHLY
    })
    @IsOptional({ groups: [CREATE, UPDATE] })
    type: TaxReturnType;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @Column({ nullable: false })
    amount: number;

    @Column({ nullable: false })
    companyId: number;

    @ManyToOne(type => Company, company => company.taxReturns)
    company: Company;

    @OneToMany(type => Invoice, invoice => invoice.taxReturn)
    invoices: Invoice[];
}
