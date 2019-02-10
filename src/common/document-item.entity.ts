import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MaxLength, IsInt, Min, Max, IsNotEmpty, IsString } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidate;

export abstract class DocumentItem extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ groups: [CREATE, UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(100, { always: true })
    @Column()
    index: number;

    @IsNotEmpty({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column()
    label: string;

    @IsNotEmpty({ groups: [CREATE, UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(10000, { always: true })
    @Column()
    quantity: number;

    @IsNotEmpty({ groups: [CREATE, UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(9999999, { always: true })
    @Column()
    unitPrice: number;

    @IsNotEmpty({ groups: [CREATE, UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(9999999, { always: true })
    @Column()
    totalPrice: number;

}