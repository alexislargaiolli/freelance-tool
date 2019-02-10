import { IsInt, IsNotEmpty, IsOptional, Max, MaxLength, Min } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quotation } from './quotation.entity';
import { CrudValidate } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidate;
@Entity()
export class QuotationItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(100, { always: true })
    @Column()
    index: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @MaxLength(100, { always: true })
    @Column()
    label: string;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(10000, { always: true })
    @Column()
    quantity: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(9999999, { always: true })
    @Column()
    unitPrice: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(9999999, { always: true })
    @Column()
    totalPrice: number;

    @Column({ nullable: false })
    quotationId: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @ManyToOne(type => Quotation, quotation => quotation.quotationItems)
    quotation: Quotation;

}