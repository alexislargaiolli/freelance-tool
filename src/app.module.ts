import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowedACLGuard } from '@common/guards/allowed-acl.guard';
import { ForbiddenACLGuard } from '@common/guards/forbidden-acl.guard';
import { CompaniesModule } from '@companies/companies.module';
import { Company } from '@companies/models/company.entity';
import { CustomersModule } from '@customers/customers.module';
import { Customer } from '@customers/models/customer.entity';
import { Quotation } from '@quotation/models/quotation.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { QuotationModule } from '@quotation/quotation.module';
import { Credential } from '@users/models/credential.entity';
import { User } from '@users/models/user.entity';
import { UsersModule } from '@users/users.module';
import { Address } from '@common/address.entity';
import { InvoiceModule } from '@invoice/invoice.module';
import { Invoice } from '@invoice/models/invoice.entity';
import { TaxReturnModule } from 'tax-return/tax-returns.module';
import { TaxReturn } from 'tax-return/models/tax-return.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'mysql',
      password: process.env.DB_PASSWORD || 'mysql',
      database: process.env.DB_NAME || 'test',
      entities: [User, Credential, Address, Company, Customer, Quotation, Invoice, TaxReturn],
      synchronize: true,
    }),
    CustomersModule,
    CompaniesModule,
    QuotationModule,
    InvoiceModule,
    TaxReturnModule
  ],
  controllers: [AppController],
  providers: [
    AppService, ForbiddenACLGuard, AllowedACLGuard
  ],
})
export class AppModule { }
