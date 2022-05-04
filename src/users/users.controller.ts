import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { MakeSerialisation } from 'src/interceptors/serialise.interceptor';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { InauthGuard } from './guards/inauth.guard';

@Controller('users')
@MakeSerialisation(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard('local'), InauthGuard)
  async register(@Body() createUserDto: CreateUserDto, @Res({passthrough: true})response: Response) {
    const {jwt} = await this.authService.register(createUserDto);
    return response.cookie('jwt', jwt, {httpOnly: true})
  }

  @Post('login')
  @UseGuards(AuthGuard('local'), InauthGuard)
  async login(@Body() body: {email: string, password: string}, @Res({passthrough: true})response: Response){
    const {jwt, user} = await this.authService.login(body.email, body.password)
    response.cookie('jwt', jwt, {httpOnly: true})
    return user
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res({passthrough: true}) res: Response){
    res.clearCookie('jwt', {httpOnly: true})
    return 'logged out'
  }

  @Get()
  findAll(@Query() q?: Partial<UserDto>) {
    return this.usersService.findAll(q);
  }

  @Get('me')
  findMe(@Request() request){
    return request.userCurrent
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
