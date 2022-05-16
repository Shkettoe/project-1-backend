import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';

@Injectable()
export class VoteService {
    constructor(@InjectRepository(Vote) private readonly voteRepo: Repository<Vote>, private readonly postsService: PostsService){}

    async getVote(user: User, post: Post){
        const v0te = await this.voteRepo.createQueryBuilder("vote").innerJoinAndSelect("vote.user", "user").innerJoinAndSelect("vote.post", "post").where("post.id = :pid", {pid: post.id}).andWhere("user.id = :uid", {uid: user.id}).getOne()
        return v0te
    }

    async vote(val: boolean, user: User, post: Post){
        const voted = await this.getVote(user, post)
        if(voted){
            if(voted.val === val) return this.delete(voted.id).then(() => {
                const score = val ? voted.post.score - 1 : voted.post.score + 1
                return this.postsService.update(voted.post.id, {score})
            })
            return this.update(voted.id).then(() => {
                const score = val ? voted.post.score + 2 : voted.post.score - 2
                return this.postsService.update(voted.post.id, {score})
            })
        }
        const v0te = await this.voteRepo.create({val, user, post})
        return this.voteRepo.save(v0te).then(() => {
            const score = val ? v0te.post.score + 1 : v0te.post.score - 1
            return this.postsService.update(v0te.post.id, {score})
        })
    }

    async update(id: number){
        const vote = await this.voteRepo.findOne(id)
        vote.val = !vote.val
        return await this.voteRepo.save(vote)
    }

    async delete(id: number){
        return await this.voteRepo.delete(id)
    }
}
