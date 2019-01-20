import { UserParameter } from '@auth/decorators/user-parameter.decorator';
import { CurrentUser } from '@auth/guards/current-user.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { Quotation } from 'quotation/models/quotation.entity';
import { QuotationsService } from 'quotation/services/quotations.service';

@Feature('UserQuotation')
@Crud(Quotation, {
    params: ['userId'],
    options: {
        join: {
            quotationItems: {}
        }
    }
})
@Controller('/users/:userId/quotations')
@UserParameter('userId')
@UseGuards(AuthGuard(), CurrentUser)
export class UserQuotationsController implements CrudController<QuotationsService, Quotation> {

    constructor(
        public service: QuotationsService,
    ) { }

    get base(): CrudController<QuotationsService, Quotation> {
        return this;
    }

}
