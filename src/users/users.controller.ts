import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { MakeSerialisation } from 'src/interceptors/serialise.interceptor';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { InauthGuard } from './guards/inauth.guard';
import { CurrentUser } from './decorators/current_user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
@MakeSerialisation(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(InauthGuard)
  async register(@Body() createUserDto: CreateUserDto, @Res({passthrough: true})response: Response) {
    const {jwt, user} = await this.authService.register(createUserDto);
    response.cookie('jwt', jwt, {httpOnly: true})
    return user
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
  findMe(@CurrentUser() user: User){
    return user
  }

  @Get(':id')
  findOne(@Param('id') id: User['id']) {
    return this.usersService.findOne(id);
  }

  @Patch('/me')
  update(@CurrentUser() user: User, @Body() updateUserDto: UserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Patch('/me/update-password')
  async updatePassword(@CurrentUser() user: User, @Body() {password, confirm_password}: {password: string, confirm_password: string}) {
    if(password === confirm_password){
      password = await this.authService.hash(password)
      return await this.usersService.update(user.id, {password});
    }
    return {msg: "passwords do not match"}
  }

  @Delete('/me')
  remove(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {httpOnly: true})
    return this.usersService.remove(user.id);
  }
}
