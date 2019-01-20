import { ForbiddenACL } from '@common/decorators/forbidden-acl.decorator';
import { ForbiddenACLGuard } from '@common/guards/forbidden-acl.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudActions, CrudController } from '@nestjsx/crud';
import { User } from '../models/user.entity';
import { UsersService } from '../services/users/users.service';
import { CurrentUser } from '@auth/guards/current-user.guard';
import { UserParameter } from '@auth/decorators/user-parameter.decorator';

@Crud(User, {
    options: {
        join: {
            companies: {},
            customers: {}
        }
    }
})
@Controller('users')
@UserParameter('id')
@ForbiddenACL(CrudActions.DeleteAll, CrudActions.DeleteOne, CrudActions.ReadAll, CrudActions.UpdateOne, CrudActions.CreateMany, CrudActions.CreateOne)
@UseGuards(AuthGuard(), ForbiddenACLGuard, CurrentUser)
export class UsersController implements CrudController<UsersService, User> {

    constructor(public service: UsersService) { }

    get base(): CrudController<UsersService, User> {
        return this;
    }

}
