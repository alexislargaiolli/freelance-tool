import { DocumentItem } from '@common/document-item.entity';
import { CrudValidate } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity';

const { CREATE, UPDATE } = CrudValidate;
@Entity()
export class InvoiceItem extends DocumentItem {

    @Column({ nullable: false })
    invoiceId: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @ManyToOne(type => Invoice, invoice => invoice.invoiceItems)
    invoice: Invoice;

}