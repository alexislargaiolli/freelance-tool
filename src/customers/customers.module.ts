import { Module } from '@nestjs/common';
import { Customer } from './models/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CustomersService } from './services/customers.service';
import { UserCustomerController } from './controllers/user-customers.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [
        UserCustomerController
    ],
    providers: [
        CustomersService,
    ],
})
export class CustomersModule { }
