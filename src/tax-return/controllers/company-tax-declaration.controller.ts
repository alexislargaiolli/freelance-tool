import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { TaxReturn } from '../models/tax-return.entity';
import { TaxReturnsService } from '..//services/tax-declaration.service';

@Feature('CompanyTaxReturns')
@Crud(TaxReturn, {
    params: ['companyId'],
    options: {
        join: {
            invoices: {},
        }
    }
})
@Controller('/companies/:companyId/taxreturns')
@UseGuards(AuthGuard())
export class CompanyTaxReturnsController implements CrudController<TaxReturnsService, TaxReturn> {

    constructor(
        public service: TaxReturnsService
    ) { }

    get base(): CrudController<TaxReturnsService, TaxReturn> {
        return this;
    }

}
