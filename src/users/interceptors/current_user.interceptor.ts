import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()
    const jwt = await request.cookies.jwt
    try{
      const {sub} = await this.jwtService.verify(jwt)
      const user = await this.usersService.findOne(sub)
      request.userCurrent = user
    }catch(err){}
    return next.handle()
  }
}
