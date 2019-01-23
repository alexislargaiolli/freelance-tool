import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { InvoiceItem } from 'invoice/models/invoice-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceItemsService extends RepositoryService<InvoiceItem> {

    constructor(
        @InjectRepository(InvoiceItem)
        public repo: Repository<InvoiceItem>,
    ) {
        super(repo);
    }

}
