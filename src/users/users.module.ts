import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from './models/credential.entity';
import { User } from './models/user.entity';
import { UsersController } from './controllers/users.controller';
import { CredentialsService } from './services/credentials/credentials.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Credential]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [
        UsersService, CredentialsService,
    ],
    controllers: [
        UsersController,
    ],
    exports: [
        UsersService, CredentialsService,
    ],
})
export class UsersModule { }
