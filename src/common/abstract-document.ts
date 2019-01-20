import { CREATE, UPDATE, CREATE_UPDATE } from '@nestjsx/crud';
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Max, MaxLength, Min } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './address.entity';

export class AbstractDocument extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @IsOptional({ ...CREATE_UPDATE })
    @IsDate({ ...UPDATE })
    @Column()
    validityDate: Date;

    /**
     * Libellé du document
     */
    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString()
    @MaxLength(200)
    @Column()
    title: string;

    /**
     * Montant totat à payer TTC
     */
    @IsOptional({ ...CREATE_UPDATE })
    @IsInt()
    @Min(0)
    @Max(9999999999)
    @Column()
    amount: number;

    /**
     * Montant totat à payer hors taxe
     */
    @IsOptional({ ...CREATE_UPDATE })
    @IsInt()
    @Min(0)
    @Max(9999999999)
    @Column()
    amountDutyFree: number;

    /**
     * Document avec ou sans TVA
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    tvaActive: boolean;

    /**
     * Montant de la TVA
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    @Min(0)
    @Max(9999999999)
    tvaAmount: number;







    //----------------------------------------------- //
    //                USER CONTACT INFO               //
    //----------------------------------------------- //


    /**
     * Nom de l'utilisateur
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    @MaxLength(100)
    userName: string;

    /**
     * Numéro de téléphone de l'utilisateur
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    @IsPhoneNumber('fr')
    userPhone: string;

    /**
     * Email de l'utilisateur
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    @IsEmail()
    userEmail: string;

    /**
     * Numéro de SIRET de l'utilisateur
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    @Length(14, 14)
    userSiret: string;

    /**
     * Adresse de facturation de l'utilisateur
     */
    @IsOptional({ ...CREATE_UPDATE })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    userFacturationAddress: Address;

    /**
     * Numéro de TVA Intra communautaire
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Column()
    @Length(13, 13)
    tvaIdentifier: string;






    //----------------------------------------------- //
    //              CUSTOMER CONTACT INFO             //
    //----------------------------------------------- //

    /**
     * Nom du client
     */
    @IsOptional({ ...CREATE_UPDATE })
    @MaxLength(100)
    @Column()
    customerName: string;

    /**
     * Numéro de téléphone du client
     */
    @IsOptional({ ...CREATE_UPDATE })
    @IsPhoneNumber('fr')
    @Column()
    customerPhone: string;

    /**
     * Email du client
     */
    @IsOptional({ ...CREATE_UPDATE })
    @IsDate()
    @Column()
    customerEmail: string;


    /**
     * Numéro de SIRET du client
     */
    @IsOptional({ ...CREATE_UPDATE })
    @Length(14, 14)
    @Column()
    customerSiret: string;

    /**
     * Adresse de facturation du client
     */
    @IsOptional({ ...CREATE_UPDATE })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    customerFacturationAddress: Address;

}