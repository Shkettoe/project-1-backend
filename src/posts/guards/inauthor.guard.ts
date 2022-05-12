import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostsService } from '../posts.service';

@Injectable()
export class InauthorGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly postService: PostsService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const {user} = await this.postService.findOne(request.params.id)
    const {sub} = this.jwtService.verify(request.cookies.jwt)
    return await user.id !== sub
  }
}
