import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private confService: ConfigService){}

  getHello(){
    const config = this.confService.get('PGUSER')
    return config
  }
}
