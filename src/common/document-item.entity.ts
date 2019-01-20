import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MaxLength, IsInt, Min, Max } from 'class-validator';

export abstract class DocumentItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsInt()
    @Min(0)
    @Max(100)
    index: number;

    @Column()
    @MaxLength(100)
    label: string;

    @IsInt()
    @Min(0)
    @Max(10000)
    @Column()
    quantity: number;

    @IsInt()
    @Min(0)
    @Max(9999999)
    @Column()
    unitPrice: number;

    @IsInt()
    @Min(0)
    @Max(9999999)
    @Column()
    totalPrice: number;

}