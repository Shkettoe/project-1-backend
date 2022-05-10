import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('HOST'),
      port: configService.get('PGPORT'),
      username: configService.get('PGUSER'),
      password: configService.get('PGPASSWORD'),
      database: configService.get('PGDATABASE'),
      synchronize: false,
      entities: [User, Post]
    }),
    inject: [ConfigService]
  }), UsersModule, PostsModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
