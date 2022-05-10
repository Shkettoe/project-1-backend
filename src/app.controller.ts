import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';
import { CurrentUser } from './users/decorators/current_user.decorator';
import { User } from './users/entities/user.entity';
import { VoteService } from './votes/vote.service';

@Controller('')
export class AppController {
    constructor(private readonly postsService: PostsService, private readonly voteService: VoteService){}
    @Get('/vote/:id')
    async getVote(@CurrentUser() user: User, @Param('id') id: number){
        const post = await this.postsService.findOne(id)
        return this.voteService.getVote(user, post)
    }
}
