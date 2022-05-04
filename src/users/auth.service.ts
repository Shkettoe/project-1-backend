import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}

    async register(createUserDto: CreateUserDto){
        const emailTaken = await this.usersService.findAll({email: createUserDto.email}) || []
        if(emailTaken.length) throw new BadRequestException('email is taken')

        const salt = await bcrypt.genSalt(13)
        createUserDto.password = `${salt}|${await bcrypt.hash(createUserDto.password, salt)}`
        const user = await this.usersService.create(createUserDto)
        return {jwt: await this.jwtService.sign({sub: user.id}), user: user}
    }

    async login(email: CreateUserDto['email'], password: CreateUserDto['password']){
        const [user] = await this.usersService.findAll({email})
        if(!user) throw new NotFoundException('user with that email not found')

        const [salt, hash] = user.password.split('|')
        const pass = bcrypt.hashSync(password, salt)
        if(pass !== hash) throw new UnauthorizedException('incorrect password')

        return {jwt: await this.jwtService.sign({sub: user.id}), user: user}
    }
}
