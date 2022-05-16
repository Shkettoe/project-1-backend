import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/users/decorators/current_user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthorGuard } from './guards/author.guard';
import { Portray } from 'src/interceptors/serialise.interceptor';
import { PostDto } from './dto/post.dto';
import { VoteService } from 'src/votes/vote.service';
import { InauthorGuard } from './guards/inauthor.guard';
import { FindManyOptions } from 'typeorm';
import { Post as _Post } from './entities/post.entity';
import { SortPosts } from './interfaces/sort-posts.interface';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
@Portray(PostDto)
export class PostsController {
  constructor(private readonly postsService: PostsService, private readonly voteService: VoteService) {}

  @Post('myquote')
  create(@Body() body: Partial<CreatePostDto>, @CurrentUser() user: User) {
    return this.postsService.create({content: body.content, user});
  }

  @Post(':id/upvote')
  @UseGuards(InauthorGuard)
  async upvote(@CurrentUser() user: User, @Param('id') id: number){
    const post = await this.findOne(id)
    return this.voteService.vote(true, user, post)
  }

  @Post(':id/downvote')
  @UseGuards(InauthorGuard)
  async downvote(@CurrentUser() user: User, @Param('id') id: number){
    const post = await this.findOne(id)
    return this.voteService.vote(false, user, post)
  }

  @Get('list')
  findAll(
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number = 1,
    @Query('posted_at') posted_at: SortPosts['posted_at'],
    @Query('score') score: SortPosts['score'],
    @Query('id') id: SortPosts['id'],
  ) {
    return this.postsService.paginate({page: 1, limit}, {posted_at, score, id});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Get('')
  random(){
    return this.postsService.findRandom()
  }

  @Patch('myquote/:id')
  @UseGuards(AuthorGuard)
  update(@Param('id') id: number, @Body() body: UpdatePostDto) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthorGuard)
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
