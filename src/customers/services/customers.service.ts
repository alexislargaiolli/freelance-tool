import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'customers/models/customer.entity';

@Injectable()
export class CustomersService extends RepositoryService<Customer> {

    constructor(
        @InjectRepository(Customer)
        public repo: Repository<Customer>,
    ) {
        super(repo);
    }

}
