import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { User } from '@users/models/user.entity';
import { CredentialsService } from '../../../users/services/credentials/credentials.service';
import { Credential } from '@users/models/credential.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly credentialsService: CredentialsService,
    ) { }

    async validateUser(payload: JwtPayload): Promise<any> {
        return this.usersService.findOneByEmail(payload.email);
    }

    async authenticate(username: string, password: string): Promise<any> {
        const [verified, credential] = await this.credentialsService.verify(username, password);
        if (!verified) {
            return false;
        }
        const user = (credential as Credential).user;
        const payload: JwtPayload = { id: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { user, token };
    }

    async register(firstname: string, lastname: string, email: string, username: string, password: string): Promise<User> {
        const user = await this.usersService.create({ firstname, lastname, email });
        await this.credentialsService.create(username, password, user);
        return user;
    }

}
