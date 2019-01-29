import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { CREATE_UPDATE, CREATE } from '@nestjsx/crud';

@Entity()
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ ...CREATE_UPDATE })
    @IsString({ ...CREATE_UPDATE })
    @MaxLength(200, { ...CREATE_UPDATE })
    @Column({ length: 120 })
    address1: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    @Column({ length: 120 })
    address2: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    @Column({ length: 120 })
    address3: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @Column({ length: 100 })
    city: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    @Column({ length: 50 })
    state: string;

    @IsNotEmpty({ ...CREATE_UPDATE })
    @IsString({ ...CREATE_UPDATE })
    @MaxLength(50, { ...CREATE_UPDATE })
    @Column({ length: 50 })
    country: string;

    @IsNotEmpty({ ...CREATE_UPDATE })
    @IsString({ ...CREATE_UPDATE })
    @MaxLength(16, { ...CREATE_UPDATE })
    @Column({ length: 16 })
    postalCode: string;

}
