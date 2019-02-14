import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { Company } from '../models/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService extends RepositoryService<Company> {

    constructor(
        @InjectRepository(Company)
        public repo: Repository<Company>,
    ) {
        super(repo);
    }

}
