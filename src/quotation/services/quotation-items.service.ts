import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { QuotationItem } from 'quotation/models/quotation-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuotationItemsService extends RepositoryService<QuotationItem> {

    constructor(
        @InjectRepository(QuotationItem)
        public repo: Repository<QuotationItem>,
    ) {
        super(repo);
    }

}
