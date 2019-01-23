import { UserParameter } from '@auth/decorators/user-parameter.decorator';
import { CurrentUser } from '@auth/guards/current-user.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { Invoice } from 'invoice/models/invoice.entity';
import { InvoicesService } from 'invoice/services/quotations.service';

@Feature('UserInvoice')
@Crud(Invoice, {
    params: ['userId'],
    options: {
        join: {
            quotationItems: {}
        }
    }
})
@Controller('/users/:userId/invoices')
@UserParameter('userId')
@UseGuards(AuthGuard(), CurrentUser)
export class UserInvoicesController implements CrudController<InvoicesService, Invoice> {

    constructor(
        public service: InvoicesService,
    ) { }

    get base(): CrudController<InvoicesService, Invoice> {
        return this;
    }

}
