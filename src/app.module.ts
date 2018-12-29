import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Credential } from './users/models/credential.entity';
import { User } from './users/models/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USER || 'mysql',
      password: process.env.DB_PASSWORD || 'mysql',
      database: process.env.DB_NAME || 'test',
      entities: [User, Credential],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }