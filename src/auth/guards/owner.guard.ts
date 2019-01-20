
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/models/user.entity';

@Injectable()
export class Owner implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        let ownerFields = this.reflector.get<string[]>('OwnerFields', context.getHandler());
        ownerFields = ownerFields != null ? ownerFields : ['user'];
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const isOwner = ownerFields.every(ownerField => {
            const userInModel = request.body[ownerField];
            if (userInModel && userInModel.id) {
                return userInModel.id === user.id;
            }
            return false;
        });
        return isOwner;
    }

}
