import { AbstractDocument } from '@common/abstract-document';
import { Company } from '@companies/models/company.entity';
import { CrudValidate } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional, Min, Max } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { InvoiceState } from './invoice-state.enum';
import { TaxReturn } from 'tax-return/models/tax-return.entity';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Invoice extends AbstractDocument {

    /**
     * Date de paiement
     */
    @Column({ nullable: true })
    @IsOptional({ groups: [CREATE, UPDATE] })
    paymentDate: Date;

    /**
     * True si la facture est payée
     */
    @Column({ default: false })
    @IsOptional({ groups: [CREATE, UPDATE] })
    paid: boolean;

    /**
     * True si la facture a été déclarée
     */
    @Column({ default: false })
    @IsOptional({ groups: [CREATE, UPDATE] })
    declaredToTaxService: boolean;

    /**
     * True si la facture est gérée par du portage salarial
     */
    @Column({ default: false })
    @IsOptional({ groups: [CREATE, UPDATE] })
    portage: boolean;

    /**
     * Montant du salaire de portage salarial
     */
    @Column({ default: 0, type: 'double' })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @IsOptional({ groups: [CREATE, UPDATE] })
    portageSalary: number;

    /**
     * Etat courant de la facture
     */
    @Column({
        type: 'enum',
        enum: InvoiceState,
        default: InvoiceState.DRAFT
    })
    @IsOptional({ groups: [CREATE, UPDATE] })
    state: string;

    @Column("simple-json")
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    invoiceItems: { label: string, quantity: number, unitPrice: number, totalPrice: number }[];

    @Column({ nullable: false })
    companyId: number;

    @ManyToOne(type => Company, company => company.invoices)
    company: Company;

    @ManyToOne(type => TaxReturn, taxReturn => taxReturn.invoices)
    taxReturn: TaxReturn;
}
