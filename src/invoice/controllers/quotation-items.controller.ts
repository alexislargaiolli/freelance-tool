import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { InvoiceItem } from 'invoice/models/invoice-item.entity';
import { InvoiceItemsService } from 'invoice/services/quotation-items.service';
import { InvoiceItemsGuard } from 'invoice/guards/quotation-items.guard';

@Feature('InvoiceItem')
@Crud(InvoiceItem, {
    params: ['invoiceId']
})
@Controller('/invoices/:invoiceId/invoiceItems')
@UseGuards(AuthGuard(), InvoiceItemsGuard)
export class InvoiceItemsController implements CrudController<InvoiceItemsService, InvoiceItem> {

    constructor(
        public service: InvoiceItemsService
    ) { }

    get base(): CrudController<InvoiceItemsService, InvoiceItem> {
        return this;
    }

}
