import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from 'quotation/models/quotation.entity';

@Injectable()
export class QuotationsService extends RepositoryService<Quotation> {

    constructor(
        @InjectRepository(Quotation)
        public repo: Repository<Quotation>,
    ) {
        super(repo);
    }

}
