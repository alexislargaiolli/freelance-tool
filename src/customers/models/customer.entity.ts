import { User } from '@users/models/user.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Address } from '@common/address.entity';
import { IsOptional, IsNotEmpty, IsString, MaxLength, Length, ValidateNested } from 'class-validator';
import { CrudValidate } from '@nestjsx/crud';
import { Type } from 'class-transformer';
const { CREATE, UPDATE } = CrudValidate;

@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @Column()
    name: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @MaxLength(100, { always: true })
    @Column()
    firstname: string;

    @IsOptional({ groups: [CREATE, UPDATE] })
    @MaxLength(100, { always: true })
    @Column()
    lastname: string;

    @Type(t => Address)
    @IsOptional({ groups: [CREATE, UPDATE] })
    @ValidateNested({ always: true })
    @ManyToOne(type => Address, { cascade: true })
    @JoinColumn()
    facturationAddress: Address;

    @Column({ nullable: false })
    userId: number;

    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @ManyToOne(type => User, user => user.customers)
    user: User;
}
