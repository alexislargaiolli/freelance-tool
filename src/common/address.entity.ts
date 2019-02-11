import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(200, { always: true })
    @Column({ length: 120 })
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

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @Column({ length: 100 })
    city: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column({ length: 50, nullable: true })
    state: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column({ length: 50 })
    country: string;

    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(16, { always: true })
    @Column({ length: 16 })
    postalCode: string;

}
