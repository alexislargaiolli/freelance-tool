import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { Company } from 'companies/models/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService extends RepositoryService<Company> {

    constructor(
        @InjectRepository(Company)
        public repo: Repository<Company>,
    ) {
        super(repo);
    }

    // async findUserCompagnies(userId: number) {
    //     return this.repo.createQueryBuilder('compagny')
    //         .leftJoinAndSelect('compagny.facturationAddress', 'facturationAddress')
    //         .innerJoin('compagny.boss', 'boss')
    //         .where('boss.id = :userId', { userId })
    //         .getMany();
    // }

    // async createAndAssign(company: DeepPartial<Company>, user: User) {
    //     company.facturationAddress = await this.addressRepo.save(company.facturationAddress);
    //     company.boss = user;
    //     return this.repo.save(company);
    // }

    // async delete(compagnyId: number) {
    //     return this.repo.delete(compagnyId);
    // }

    // async isOwner(compagnyId: number, userId: number) {
    //     const compagny = await this.repo.findOne(compagnyId, { relations: ['boss'] });
    //     return compagny && compagny.boss.id === userId;
    // }

}
