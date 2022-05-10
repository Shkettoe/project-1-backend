import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { DtoConstructor } from 'src/interfaces/dto-constructor.interface';

export const Portray = (dto: DtoConstructor) =>{
  return UseInterceptors(new SerialiseInterceptor(dto))
}

@Injectable()
export class SerialiseInterceptor implements NestInterceptor {
  constructor(private readonly dto: DtoConstructor){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data)
      })
    )
  }
}
