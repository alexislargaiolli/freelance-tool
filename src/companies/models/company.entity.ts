import { User } from '@users/models/user.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Address } from '@common/address.entity';
import { CREATE, UPDATE, CREATE_UPDATE } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString({ ...CREATE_UPDATE })
    @MaxLength(100, { ...CREATE_UPDATE })
    @Column()
    name: string;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString({ ...CREATE_UPDATE })
    @MinLength(14, { ...CREATE_UPDATE })
    @MaxLength(14, { ...CREATE_UPDATE })
    @Column()
    siret: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    facturationAddress: Address;

    @Column({ nullable: false })
    bossId: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @ManyToOne(type => User, user => user.companies)
    boss: User;

}
