import { CREATE, UPDATE } from '@nestjsx/crud';
import { IsInt, IsNotEmpty, IsOptional, Max, MaxLength, Min } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ ...UPDATE })
    @Column()
    @IsInt()
    @Min(0)
    @Max(100)
    index: number;

    @IsOptional({ ...UPDATE })
    @MaxLength(100)
    @Column()
    label: string;

    @IsOptional({ ...UPDATE })
    @IsInt()
    @Min(0)
    @Max(10000)
    @Column()
    quantity: number;

    @IsOptional({ ...UPDATE })
    @IsInt()
    @Min(0)
    @Max(9999999)
    @Column()
    unitPrice: number;

    @IsOptional({ ...UPDATE })
    @IsInt()
    @Min(0)
    @Max(9999999)
    @Column()
    totalPrice: number;

    @Column({ nullable: false })
    invoiceId: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @ManyToOne(type => Invoice, invoice => invoice.invoiceItems)
    invoice: Invoice;

}