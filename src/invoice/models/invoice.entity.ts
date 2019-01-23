import { AbstractDocument } from '@common/abstract-document';
import { CREATE, CREATE_UPDATE, UPDATE } from '@nestjsx/crud';
import { User } from '@users/models/user.entity';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { InvoiceState } from './invoice-state.enum';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice extends AbstractDocument {

    /**
     * Date d'envoi
     */
    @Column()
    @IsOptional({ ...CREATE_UPDATE })
    @IsDate({ ...UPDATE })
    sendingDate: Date;

    /**
     * Date de paiement
     */
    @Column()
    @IsOptional({ ...CREATE_UPDATE })
    @IsDate({ ...UPDATE })
    paymentDate: Date;

    /**
     * True si la facture est payée
     */
    @Column()
    @IsOptional({ ...CREATE_UPDATE })
    paid: boolean;

    /**
     * True si la facture a été déclarée
     */
    @Column()
    @IsOptional({ ...CREATE_UPDATE })
    declaredToTaxService: boolean;

    /**
     * Etat courant de la facture
     */
    @Column({
        type: 'enum',
        enum: InvoiceState,
        default: InvoiceState.DRAFT
    })
    state: string;

    @OneToMany(type => InvoiceItem, invoiceItem => invoiceItem.invoice)
    invoiceItems: InvoiceItem[];

    @Column({ nullable: false })
    userId: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @ManyToOne(type => User, user => user.quotations)
    user: User;
}
