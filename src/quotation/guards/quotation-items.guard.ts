import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QuotationsService } from 'quotation/services/quotations.service';

@Injectable()
export class QuotationItemsGuard implements CanActivate {
    constructor(private reflector: Reflector, private quotationsService: QuotationsService) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const quotationId = request.params.quotationId;
        const quotation = await this.quotationsService.getOne(quotationId);

        return quotation.userId === request.user.id;
    }
}