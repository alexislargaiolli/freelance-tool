import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Quotation } from './models/quotation.entity';
import { QuotationsService } from './services/quotations.service';
import { CompanyQuotationsController } from './controllers/company-quotation.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quotation]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        CompanyQuotationsController
    ],
    providers: [
        QuotationsService
    ],
})
export class QuotationModule { }
