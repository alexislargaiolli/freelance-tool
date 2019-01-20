import { UserParameter } from '@auth/decorators/user-parameter.decorator';
import { CurrentUser } from '@auth/guards/current-user.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { Customer } from 'customers/models/customer.entity';
import { CustomersService } from 'customers/services/customers.service';

@Feature('UserCustomer')
@Crud(Customer, {
    params: ['userId']
})
@Controller('/users/:userId/customers')
@UserParameter('userId')
@UseGuards(AuthGuard(), CurrentUser)
export class UserCustomerController implements CrudController<CustomersService, Customer> {

    constructor(
        public service: CustomersService,
    ) { }

    get base(): CrudController<CustomersService, Customer> {
        return this;
    }

}
