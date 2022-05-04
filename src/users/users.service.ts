import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query: Partial<User>) {
    const q = plainToClass(UserDto, query)
    const users = await this.userRepo.find({where: q})
    if(!users.length) throw new NotFoundException(`couldn't find users based off given query`)
    return users
  }

  async findOne(id: User['id']) {
    try{
      return await this.userRepo.findOneOrFail(id)
    }
    catch(err){
      throw new NotFoundException('user not found', err)
    }  
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
