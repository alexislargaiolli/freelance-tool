import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getFeature, getAction, CrudActions } from '@nestjsx/crud';

@Injectable()
export class AllowedACLGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(ctx: ExecutionContext): boolean {
        const handler = ctx.getHandler();
        const controller = ctx.getClass();

        const feature = getFeature(controller);
        const action = getAction(handler);

        let allowedACL = this.reflector.get<CrudActions[]>('AllowedACL', controller);
        if (!allowedACL || allowedACL.length === 0) {
            return true;
        }
        return (allowedACL as CrudActions[]).some(aclAction => aclAction === action);
    }
}