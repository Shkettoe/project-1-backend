import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface DTOConstructor{
  new (...args: any[]): {};
}

export const MakeSerialisation = (dto: DTOConstructor) =>{
  return UseInterceptors(new SerialiseInterceptor(dto))
}

@Injectable()
export class SerialiseInterceptor implements NestInterceptor {
  constructor(private readonly dto: DTOConstructor){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data)
      })
    )
  }
}
