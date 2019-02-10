import { Module } from '@nestjs/common';
import { InvoiceItem } from './models/invoice-item.entity';
import { Invoice } from './models/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserInvoicesController } from './controllers/user-invoice.controller';
import { InvoiceItemsController } from './controllers/invoice-items.controller';
import { InvoicesService } from './services/quotations.service';
import { InvoiceItemsService } from './services/quotation-items.service';
import { InvoiceItemsGuard } from './guards/quotation-items.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Invoice, InvoiceItem]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        UserInvoicesController, InvoiceItemsController
    ],
    providers: [
        InvoicesService, InvoiceItemsService, InvoiceItemsGuard
    ],
})
export class InvoiceModule {

}
