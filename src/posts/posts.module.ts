import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Vote } from 'src/votes/vote.entity';
import { VoteService } from 'src/votes/vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Vote]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }, VoteService],
  exports: [PostsService, VoteService]
})
export class PostsModule {}
