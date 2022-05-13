import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private readonly postRepo: Repository<Post>){}
  async create(createPostDto: CreatePostDto) {
    const post = await this.postRepo.create(createPostDto)
    return this.postRepo.save(post)
  }

  findAll() {
    return this.postRepo.find({relations: ['user']})
  }

  findOne(id: number) {
    return this.postRepo.findOneOrFail(id, {relations: ['user']})
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id)
    if(updatePostDto.content.length) post.content = updatePostDto.content
    return this.postRepo.save(post)
  }

  remove(id: number) {
    return this.postRepo.delete(id)
  }
}
