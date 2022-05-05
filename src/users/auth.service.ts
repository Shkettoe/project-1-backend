import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService, @InjectRepository(User)private readonly userRepo:Repository<User>){}

    async register(createUserDto: CreateUserDto){
        const emailTaken = await this.userRepo.find({email: createUserDto.email}) || []
        if(emailTaken.length) throw new BadRequestException('email is taken')

        createUserDto.password = await this.hash(createUserDto.password)

        const user = await this.usersService.create(createUserDto)

        return {jwt: await this.jwtService.sign({sub: user.id}), user: user}
    }

    async hash(password: CreateUserDto['password']){
        const salt = await bcrypt.genSalt(13)
        password = `${salt}|${await bcrypt.hash(password, salt)}`
        return password
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
