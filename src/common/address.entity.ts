import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToOne } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { Invoice } from '@invoice/models/invoice.entity';
import { Type } from 'class-transformer';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(200, { always: true })
    @Column({ length: 120, nullable: true })
    address1: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(200, { always: true })
    @Column({ length: 120, nullable: true })
    address2: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString()
    @MaxLength(200)
    @Column({ length: 120, nullable: true })
    address3: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ length: 100, nullable: true })
    city: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column({ length: 50, nullable: true })
    state: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column({ length: 50, nullable: true })
    country: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(16, { always: true })
    @Column({ length: 16, nullable: true })
    postalCode: string;

}
