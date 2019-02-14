import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from 'invoice/models/invoice.entity';

@Injectable()
export class InvoicesService extends RepositoryService<Invoice> {

    constructor(
        @InjectRepository(Invoice)
        public repo: Repository<Invoice>,
    ) {
        super(repo);
    }

}
