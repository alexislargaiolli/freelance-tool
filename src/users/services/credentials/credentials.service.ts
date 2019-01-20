import { Injectable } from '@nestjs/common';
import { Credential } from '../../models/credential.entity';
import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@users/models/user.entity';

@Injectable()
export class CredentialsService {
    private static readonly SALT_ROUNDS = 10;

    constructor(
        @InjectRepository(Credential)
        private readonly credentialRepository: Repository<Credential>,
    ) { }

    async findOne(username: string) {
        return this.credentialRepository.findOne({ username });
    }

    async verify(username: string, password: string) {
        const credential = await this.credentialRepository.findOne({ username }, { relations: ['user'] });
        if (credential == null) {
            return [false, null];
        }
        const verified = await this.compareHash(password, credential.password);
        return [verified, credential];
    }

    async create(username: string, password: string, user: DeepPartial<User>) {
        const hashedPassword = await this.hashPassword(password);
        return this.credentialRepository.save({ username, password: hashedPassword, user });
    }

    async hashPassword(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, CredentialsService.SALT_ROUNDS);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async delete(id) {
        return this.credentialRepository.delete({ username: id });
    }

}
