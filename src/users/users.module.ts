import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }]
})
export class UsersModule {}
