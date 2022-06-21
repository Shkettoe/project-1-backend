import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { SortPosts } from './interfaces/sort-posts.interface';

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

  async paginate(options: IPaginationOptions, order: SortPosts){
    return (await paginate<Post>(this.postRepo, options, {relations: ['user'], order})).items
  }

  async findOne(id: number) {
    try{
      return await this.postRepo.findOneOrFail(id, {relations: ['user']})
    }catch(err){
      throw new NotFoundException(`post with an id of ${id} couldn't be found`, err)
    }
  }

  async findRandom(){
    const posts = await this.findAll()
    return posts[Math.floor(Math.random() * posts.length)]
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id)
    for (const key in updatePostDto) {
      post[key] = updatePostDto[key]
    }
    return this.postRepo.save(post)
  }

  remove(id: number) {
    return this.postRepo.delete(id)
    // return 'deleted'
  }
}
