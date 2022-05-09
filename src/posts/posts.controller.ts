import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/users/decorators/current_user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthorGuard } from './guards/author.guard';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('myquote')
  create(@Body() body: Partial<CreatePostDto>, @CurrentUser() user: User) {
    return this.postsService.create({content: body.content, user});
  }

  @Get('list')
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
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
