import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Quotation } from './models/quotation.entity';
import { QuotationsService } from './services/quotations.service';
import { QuotationItem } from './models/quotation-item.entity';
import { UserQuotationsController } from './controllers/user-quotation.controller';
import { QuotationItemsService } from './services/quotation-items.service';
import { QuotationItemsController } from './controllers/quotation-items.controller';
import { QuotationItemsGuard } from './guards/quotation-items.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quotation, QuotationItem]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        UserQuotationsController, QuotationItemsController
    ],
    providers: [
        QuotationsService, QuotationItemsService, QuotationItemsGuard
    ],
})
export class QuotationModule { }
