import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../models/user.entity';
import { RepositoryService } from '@nestjsx/crud/typeorm';


@Injectable()
export class UsersService extends RepositoryService<User> {

    constructor(
        @InjectRepository(User)
        public repo: Repository<User>
    ) {
        super(repo);
    }

}
