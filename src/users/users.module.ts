import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CurrentUserInterceptor } from './interceptors/current_user.interceptor';

@Module({
  imports:[TypeOrmModule.forFeature([User]), PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) =>({
      secret: configService.get('JWTSECRET')
    }),
    inject: [ConfigService]
  })],
  controllers: [UsersController],
  providers: [UsersService, AuthService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }, { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor}, JwtStrategy, LocalStrategy]
})
export class UsersModule {}
