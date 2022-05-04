import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('HOST'),
      post: configService.get('PGPORT'),
      username: configService.get('PGUSER'),
      password: configService.get('PGPASSWORD'),
      database: configService.get('PGDATABASE'),
      synchronize: true,
      entities: [User],
    }),
    inject: [ConfigService]
  }), UsersModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
