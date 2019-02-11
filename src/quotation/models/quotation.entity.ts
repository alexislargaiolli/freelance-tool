import { AbstractDocument } from '@common/abstract-document';
import { User } from '@users/models/user.entity';
import { IsDate, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { QuotationItem } from './quotation-item.entity';
import { QuotationState } from './quotation-state.enum';
import { Type } from 'class-transformer';
import { CrudValidate } from '@nestjsx/crud';
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

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Type((t) => QuotationItem)
    @ValidateNested()
    @OneToMany(type => QuotationItem, quotationItem => quotationItem.quotation, { cascade: true })
    quotationItems: QuotationItem[];

    @Column({ nullable: false })
    userId: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ManyToOne(type => User, user => user.quotations)
    user: User;
}
