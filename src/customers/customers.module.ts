import { Module } from '@nestjs/common';
import { Customer } from './models/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CustomersService } from './services/customers.service';
import { CompanyCustomerController } from './controllers/company-customers.controller';
import { Address } from '@common/address.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, Address]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        CompanyCustomerController
    ],
    providers: [
        CustomersService,
    ],
})
export class CustomersModule { }
