import { Module } from '@nestjs/common';
import { Invoice } from './models/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CompanyInvoicesController } from './controllers/company-invoice.controller';
import { InvoicesService } from './services/invoices.service';
import { Address } from '@common/address.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Invoice, Address]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        CompanyInvoicesController
    ],
    providers: [
        InvoicesService
    ],
})
export class InvoiceModule {

}
