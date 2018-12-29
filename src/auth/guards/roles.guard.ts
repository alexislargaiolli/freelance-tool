
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/models/user.entity';
import { UserRole } from '../../users/models/user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const hasMissingRole = () => (roles as UserRole[]).some(role => user.roles.indexOf(role) === -1);
        return user && user.roles && !hasMissingRole();
    }

}
