
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/models/user.entity';
import { UserRole } from '../../users/models/user-roles.enum';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        let ownerFields = this.reflector.get<string[]>('OwnerFields', context.getHandler());
        ownerFields = ownerFields != null ? ownerFields : ['user'];
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        let isOwner = false;
        for (const ownerField of ownerFields) {
            const userInModel = request.body[ownerField];
            if (userInModel && userInModel.id) {
                isOwner = isOwner && userInModel.id === user.id;
            }
        }
        return isOwner || user.roles.indexOf(UserRole.ADMIN) !== -1;
    }

}
