import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private static extractJWT(req: Request) {
    try{
      return req.cookies.jwt;
    } catch(err){
      throw new UnauthorizedException('token not found')
    }
  }

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWTSECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
