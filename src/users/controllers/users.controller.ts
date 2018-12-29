import { Body, Controller, Get, Post, UseGuards, Delete, Param } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { CreateUserDto } from '../validations/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../models/user-roles.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    @Roles(UserRole.ADMIN)
    async findAll() {
        return this.usersService.findAll();
    }

    @Post()
    @Roles(UserRole.ADMIN)
    async create(@Body() createUserDTO: CreateUserDto) {
        return this.usersService.create(createUserDTO);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }

}
