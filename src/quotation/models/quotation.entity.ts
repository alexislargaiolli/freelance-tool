import { AbstractDocument } from '@common/abstract-document';
import { Company } from '@companies/models/company.entity';
import { CrudValidate } from '@nestjsx/crud';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { QuotationState } from './quotation-state.enum';
const { CREATE, UPDATE } = CrudValidate;
@Entity()
export class Quotation extends AbstractDocument {

    /**
     * Date de validation d'un devis
     */
    @Column({ nullable: true })
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsDate({ always: true })
    validationDate: Date;

    /**
     * Etat courant du devis
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({
        type: 'enum',
        enum: QuotationState,
        default: QuotationState.DRAFT
    })
    state: string;

    @Column("simple-json")
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    quotationItems: { label: string, quantity: number, unitPrice: number, totalPrice: number }[];

    @Column({ nullable: false })
    companyId: number;

    @ManyToOne(type => Company, company => company.quotations)
    company: Company;
}
