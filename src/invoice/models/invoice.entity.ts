import { AbstractDocument } from '@common/abstract-document';
import { User } from '@users/models/user.entity';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { InvoiceState } from './invoice-state.enum';
import { InvoiceItem } from './invoice-item.entity';
import { Type } from 'class-transformer';
import { CrudValidate } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Invoice extends AbstractDocument {

    /**
     * Date d'envoi
     */
    @Column({ nullable: true })
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsDate({ always: true })
    sendingDate: Date;

    /**
     * Date de paiement
     */
    @Column()
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsDate({ always: true })
    paymentDate: Date;

    /**
     * True si la facture est payée
     */
    @Column()
    @IsOptional({ groups: [CREATE, UPDATE] })
    paid: boolean;

    /**
     * True si la facture a été déclarée
     */
    @Column()
    @IsOptional({ groups: [CREATE, UPDATE] })
    declaredToTaxService: boolean;

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

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Type((t) => InvoiceItem)
    @OneToMany(type => InvoiceItem, invoiceItem => invoiceItem.invoice, { cascade: true })
    invoiceItems: InvoiceItem[];

    @Column({ nullable: false })
    userId: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ManyToOne(type => User, user => user.quotations)
    user: User;
}
