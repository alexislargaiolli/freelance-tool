import { Controller, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Feature, Override } from '@nestjsx/crud';
import { Customer } from 'customers/models/customer.entity';
import { CustomersService } from 'customers/services/customers.service';
import { Address } from '@common/address.entity';
import { Repository, ObjectLiteral } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Feature('CompanyCustomer')
@Crud(Customer, {
    params: ['companyId'],
    options: {
        join: {
            facturationAddress: {}
        }
    }
})
@Controller('/companies/:companyId/customers')
@UseGuards(AuthGuard())
export class CompanyCustomerController implements CrudController<CustomersService, Customer> {

    constructor(
        public service: CustomersService,
        @InjectRepository(Address)
        public addressRepo: Repository<Address>,
    ) { }

    get base(): CrudController<CustomersService, Customer> {
        return this;
    }

    @Override()
    async deleteOne(@Param('id') id: number, @Param() params: ObjectLiteral): Promise<void> {
        const customer = await this.service.repo.findOne(id);
        return this.base.deleteOneBase(id, params).then(() => {
            this.addressRepo.delete(customer.facturationAddress);
        });
    }

}
