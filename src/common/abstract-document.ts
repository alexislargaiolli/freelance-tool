import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from 'typeorm';
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
    @Column({ nullable: true })
    startDate: Date;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @Column({ nullable: true })
    validityDate: Date;

    /**
     * Date d'envoi
     */
    @Column({ nullable: true })
    @IsOptional({ groups: [CREATE, UPDATE] })
    sendingDate: Date;


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
    * Numéro du document
    */
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(10, { always: true })
    @Column({ length: 10 })
    code: string;

    /**
     * Montant totat à payer TTC
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @Column({ default: 0, type: 'double' })
    amount: number;

    /**
     * Montant totat à payer hors taxe
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Min(0, { always: true })
    @Max(9999999999, { always: true })
    @Column({ default: 0, type: 'double' })
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
    @Column({ default: 0, type: 'double' })
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

    @Column({ nullable: true })
    userFacturationAddressId: number;

    /**
     * Adresse de facturation de l'utilisateur
     */
    @Type(t => Address)
    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @OneToOne(type => Address, { cascade: true, nullable: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    @ValidateNested({ always: true })
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
    @IsEmail({}, { always: true })
    @Column({ nullable: true })
    customerEmail: string;


    /**
     * Numéro de SIRET du client
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @Length(14, 14, { always: true })
    @Column({ nullable: true })
    customerSiret: string;

    @Column({ nullable: true })
    customerFacturationAddressId: number;

    /**
     * Adresse de facturation du client
     */
    @Type(t => Address)
    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @OneToOne(type => Address, { cascade: true, nullable: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    @ValidateNested({ always: true })
    customerFacturationAddress: Address;

}