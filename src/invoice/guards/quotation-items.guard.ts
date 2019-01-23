import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InvoicesService } from 'invoice/services/quotations.service';

@Injectable()
export class InvoiceItemsGuard implements CanActivate {
    constructor(private reflector: Reflector, private invoicesService: InvoicesService) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const invoiceId = request.params.invoiceId;
        const invoice = await this.invoicesService.getOne(invoiceId);

        return invoice.userId === request.user.id;
    }
}