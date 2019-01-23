import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CompaniesService } from './services/companies.service';
import { Company } from './models/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompaniesController } from './controllers/user-companies.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        UserCompaniesController,
    ],
    providers: [
        CompaniesService,
    ],
})
export class CompaniesModule { }
