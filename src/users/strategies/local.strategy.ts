import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'email'
        })
    }

    async validate(username: string, password: string){
        try{
            return await this.authService.login(username, password)
        } catch(err){
            throw new UnauthorizedException('unauthorised', err)
        }
    }
}