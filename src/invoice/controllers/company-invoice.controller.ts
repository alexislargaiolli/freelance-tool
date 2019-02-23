import { Address } from '@common/address.entity';
import { Controller, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Crud, CrudController, Feature, Override } from '@nestjsx/crud';
import { Invoice } from 'invoice/models/invoice.entity';
import { InvoicesService } from 'invoice/services/invoices.service';
import { ObjectLiteral, Repository } from 'typeorm';

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
        @InjectRepository(Address)
        public addressRepo: Repository<Address>,
    ) { }

    get base(): CrudController<InvoicesService, Invoice> {
        return this;
    }

    @Override()
    async deleteOne(@Param('id') id: number, @Param() params: ObjectLiteral, ): Promise<void> {
        const invoice = await this.service.repo.findOne(id);
        return this.base.deleteOneBase(id, params).then(() => {
            this.addressRepo.delete(invoice.userFacturationAddressId);
            this.addressRepo.delete(invoice.customerFacturationAddressId);
        });
    }

}
