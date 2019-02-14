import { Module } from '@nestjs/common';
import { Invoice } from './models/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CompanyInvoicesController } from './controllers/company-invoice.controller';
import { InvoicesService } from './services/invoices.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Invoice]),
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
