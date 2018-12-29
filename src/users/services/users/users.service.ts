import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/validations/create-user-dto';
import { CredentialsService } from '../credentials/credentials.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private credentialService: CredentialsService,
    ) { }

    async findById(id: number) {
        return this.userRepository.findOne(id);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async delete(id: number): Promise<any> {
        const user = await this.findById(id);

        await this.credentialService.delete(user.email);
        return this.userRepository.delete(id);
    }

    async create(user: CreateUserDto): Promise<User> {
        const u = await this.userRepository.create(user);
        return this.userRepository.save(u);
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

}
