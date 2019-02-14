import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { Quotation } from 'quotation/models/quotation.entity';
import { QuotationsService } from 'quotation/services/quotations.service';

@Feature('CompanyQuotation')
@Crud(Quotation, {
    params: ['companyId']
})
@Controller('/companies/:companyId/quotations')
@UseGuards(AuthGuard())
export class CompanyQuotationsController implements CrudController<QuotationsService, Quotation> {

    constructor(
        public service: QuotationsService,
    ) { }

    get base(): CrudController<QuotationsService, Quotation> {
        return this;
    }

}
