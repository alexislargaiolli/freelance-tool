import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController, Feature } from '@nestjsx/crud';
import { Company } from '../models/company.entity';
import { CompaniesService } from '../services/companies.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@auth/guards/current-user.guard';
import { UserParameter } from '@auth/decorators/user-parameter.decorator';

@Feature('UserCompany')
@Crud(Company, {
    params: ['bossId'],
    options: {
        join: {
            facturationAddress: {}
        }
    }
})
@Controller('/users/:bossId/companies')
@UserParameter('bossId')
@UseGuards(AuthGuard(), CurrentUser)
export class UserCompaniesController implements CrudController<CompaniesService, Company> {

    constructor(
        public service: CompaniesService,
    ) { }

    get base(): CrudController<CompaniesService, Company> {
        return this;
    }

}
