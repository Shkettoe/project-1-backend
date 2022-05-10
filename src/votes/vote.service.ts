import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';

@Injectable()
export class VoteService {
    constructor(@InjectRepository(Vote) private readonly voteRepo: Repository<Vote>){}

    async vote(val: boolean, user: User, post: Post){
        const v0te = await this.voteRepo.create({val, user, post})
        return this.voteRepo.save(v0te)
    }
}
