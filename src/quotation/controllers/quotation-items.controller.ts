import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { QuotationItemsGuard } from 'quotation/guards/quotation-items.guard';
import { QuotationItem } from 'quotation/models/quotation-item.entity';
import { QuotationItemsService } from 'quotation/services/quotation-items.service';

@Feature('QuotationItem')
@Crud(QuotationItem, {
    params: ['quotationId']
})
@Controller('/quotations/:quotationId/quotationItems')
@UseGuards(AuthGuard(), QuotationItemsGuard)
export class QuotationItemsController implements CrudController<QuotationItemsService, QuotationItem> {

    constructor(
        public service: QuotationItemsService
    ) { }

    get base(): CrudController<QuotationItemsService, QuotationItem> {
        return this;
    }

}
