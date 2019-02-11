import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';
import { CrudValidate } from '@nestjsx/crud';
import { Type } from 'class-transformer';
const { CREATE, UPDATE } = CrudValidate;
export class AbstractDocument extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsDate({ always: true })
    @Column({ nullable: true })
    validityDate: Date;

    /**
     * Libellé du document
     */
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(200, { always: true })
    @Column({ length: 200 })
    title: string;

    /**
     * Montant totat à payer TTC
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @Column({ default: 0 })
    amount: number;

    /**
     * Montant totat à payer hors taxe
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsInt({ always: true })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @Column({ default: 0 })
    amountDutyFree: number;

    /**
     * Document avec ou sans TVA
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({ default: false })
    tvaActive: boolean;

    /**
     * Montant de la TVA
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @Column({ default: 0 })
    tvaAmount: number;







    //----------------------------------------------- //
    //                USER CONTACT INFO               //
    //----------------------------------------------- //


    /**
     * Nom de l'utilisateur
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({ nullable: true })
    @MaxLength(100, { always: true })
    userName: string;

    /**
     * Numéro de téléphone de l'utilisateur
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsPhoneNumber('fr', { always: true })
    @Column({ nullable: true })
    userPhone: string;

    /**
     * Email de l'utilisateur
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsEmail({}, { always: true })
    @Column({ nullable: true })
    userEmail: string;

    /**
     * Numéro de SIRET de l'utilisateur
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Length(14, 14, { always: true })
    @Column({ nullable: true })
    userSiret: string;

    /**
     * Adresse de facturation de l'utilisateur
     */
    @Type(t => Address)
    @IsOptional({ groups: [CREATE, UPDATE] })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    @ValidateNested()
    userFacturationAddress: Address;

    /**
     * Numéro de TVA Intra communautaire
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Length(13, 13, { always: true })
    @Column({ nullable: true })
    tvaIdentifier: string;






    //----------------------------------------------- //
    //              CUSTOMER CONTACT INFO             //
    //----------------------------------------------- //

    /**
     * Nom du client
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @MaxLength(100, { always: true })
    @Column({ nullable: true })
    customerName: string;

    /**
     * Numéro de téléphone du client
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsPhoneNumber('fr', { always: true })
    @Column({ nullable: true })
    customerPhone: string;

    /**
     * Email du client
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @IsDate({ always: true })
    @Column({ nullable: true })
    customerEmail: string;


    /**
     * Numéro de SIRET du client
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Length(14, 14, { always: true })
    @Column({ nullable: true })
    customerSiret: string;

    /**
     * Adresse de facturation du client
     */
    @Type(t => Address)
    @IsOptional({ groups: [CREATE, UPDATE] })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    @ValidateNested()
    customerFacturationAddress: Address;

}