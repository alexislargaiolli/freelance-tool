
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/models/user.entity';

@Injectable()
export class CurrentUser implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        let userParameter = this.reflector.get<string>('UserParameter', context.getClass());
        userParameter = userParameter != null ? userParameter : 'userId';
        const request = context.switchToHttp().getRequest();
        const requestUserId = Number(request.params[userParameter]);
        const user: User = request.user;
        return user.id === requestUserId;
    }

}
