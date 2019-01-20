import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getFeature, getAction, CrudActions } from '@nestjsx/crud';

@Injectable()
export class ForbiddenACLGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(ctx: ExecutionContext): boolean {
        const handler = ctx.getHandler();
        const controller = ctx.getClass();

        const feature = getFeature(controller);
        const action = getAction(handler);

        let forbiddenACL = this.reflector.get<CrudActions[]>('ForbiddenACL', controller);
        if (!forbiddenACL || forbiddenACL.length === 0) {
            return true;
        }
        return !(forbiddenACL as CrudActions[]).some(aclAction => aclAction === action);
    }
}