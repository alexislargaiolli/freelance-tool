import { AbstractDocument } from '@common/abstract-document';
import { CREATE, CREATE_UPDATE, UPDATE } from '@nestjsx/crud';
import { User } from '@users/models/user.entity';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { QuotationItem } from './quotation-item.entity';
import { QuotationState } from './quotation-state.enum';

@Entity()
export class Quotation extends AbstractDocument {

    /**
     * Date de validation d'un devis
     */
    @Column()
    @IsOptional({ ...CREATE_UPDATE })
    @IsDate({ ...UPDATE })
    validationDate: Date;

    /**
     * Etat courant du devis
     */
    @Column({
        type: 'enum',
        enum: QuotationState,
        default: QuotationState.DRAFT
    })
    state: string;

    @OneToMany(type => QuotationItem, quotationItem => quotationItem.quotation)
    quotationItems: QuotationItem[];

    @Column({ nullable: false })
    userId: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @ManyToOne(type => User, user => user.quotations)
    user: User;
}
