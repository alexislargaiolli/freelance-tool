import { User } from '@users/models/user.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Address } from '@common/address.entity';
import { IsOptional, IsNotEmpty, IsString, MaxLength, Length } from 'class-validator';
import { UPDATE, CREATE, CREATE_UPDATE } from '@nestjsx/crud';

@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @IsString({ ...CREATE_UPDATE })
    @MaxLength(50, { ...CREATE_UPDATE })
    @Column()
    name: string;

    @IsOptional({ ...CREATE_UPDATE })
    @MaxLength(100, { ...CREATE_UPDATE })
    @Column()
    firstname: string;

    @IsOptional({ ...CREATE_UPDATE })
    @MaxLength(100, { ...CREATE_UPDATE })
    @Column()
    lastname: string;

    @IsOptional({ ...CREATE_UPDATE })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    facturationAddress: Address;

    @Column({ nullable: false })
    userId: number;

    @IsOptional({ ...UPDATE })
    @IsNotEmpty({ ...CREATE })
    @ManyToOne(type => User, user => user.customers)
    user: User;
}
