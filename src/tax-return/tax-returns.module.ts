import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyTaxReturnsController } from './controllers/company-tax-declaration.controller';
import { TaxReturn } from './models/tax-return.entity';
import { TaxReturnsService } from './services/tax-declaration.service';
import { Company } from '@companies/models/company.entity';
import { Invoice } from '@invoice/models/invoice.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaxReturn, Invoice, Company]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        CompanyTaxReturnsController
    ],
    providers: [
        TaxReturnsService
    ],
})
export class TaxReturnModule {

}
