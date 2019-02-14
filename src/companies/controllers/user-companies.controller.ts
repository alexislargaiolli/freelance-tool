import { Controller, UseGuards, Param, Query } from '@nestjs/common';
import { Crud, CrudController, Feature, Override, RestfulParamsDto } from '@nestjsx/crud';
import { Company } from '../models/company.entity';
import { CompaniesService } from '../services/companies.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@auth/guards/current-user.guard';
import { UserParameter } from '@auth/decorators/user-parameter.decorator';
import { ObjectLiteral } from 'typeorm';

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

    // @Override()
    // getOne(@Param('id') id: number, @Param() params: ObjectLiteral, @Query() query: RestfulParamsDto) {
    //     this.base.getOneBase()
    //     return this.service.repo.findOne(id);
    // }

}
