import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowedACLGuard } from './common/guards/allowed-acl.guard';
import { ForbiddenACLGuard } from './common/guards/forbidden-acl.guard';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/models/company.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/models/customer.entity';
import { QuotationItem } from './quotation/models/quotation-item.entity';
import { Quotation } from './quotation/models/quotation.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuotationModule } from './quotation/quotation.module';
import { Credential } from './users/models/credential.entity';
import { User } from './users/models/user.entity';
import { UsersModule } from './users/users.module';
import { Address } from './common/address.entity';

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
      entities: [User, Credential, Address, Company, Customer, Quotation, QuotationItem],
      synchronize: true,
    }),
    CustomersModule,
    CompaniesModule,
    QuotationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, ForbiddenACLGuard, AllowedACLGuard
  ],
})
export class AppModule { }
