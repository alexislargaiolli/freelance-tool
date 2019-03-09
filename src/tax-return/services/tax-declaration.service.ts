import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { TaxReturn } from '../models/tax-return.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaxReturnsService extends RepositoryService<TaxReturn> {

    constructor(
        @InjectRepository(TaxReturn)
        public repo: Repository<TaxReturn>,
    ) {
        super(repo);
    }

}
