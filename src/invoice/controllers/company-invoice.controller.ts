import { Controller, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature, Override, RestfulParamsDto } from '@nestjsx/crud';
import { Invoice } from 'invoice/models/invoice.entity';
import { InvoicesService } from 'invoice/services/invoices.service';
import { ObjectLiteral } from 'typeorm';

@Feature('CompanyInvoice')
@Crud(Invoice, {
    params: ['companyId'],
    options: {
        join: {
            userFacturationAddress: {},
            customerFacturationAddress: {}
        }
    }
})
@Controller('/companies/:companyId/invoices')
@UseGuards(AuthGuard())
export class CompanyInvoicesController implements CrudController<InvoicesService, Invoice> {

    constructor(
        public service: InvoicesService,
    ) { }

    get base(): CrudController<InvoicesService, Invoice> {
        return this;
    }

}
