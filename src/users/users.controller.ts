import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseGuards, UploadedFile, UseInterceptors, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { Portray } from 'src/interceptors/serialise.interceptor';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { InauthGuard } from './guards/inauth.guard';
import { CurrentUser } from './decorators/current_user.decorator';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as crypto from 'crypto'
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'
const cloudinary = require('cloudinary').v2
require('dotenv').config()

@Controller('users')
@Portray(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService, private readonly configService: ConfigService) {}

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

  @Patch('pfp')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/uploads',
      filename(_, file, callback) {
        const randomName = crypto.randomBytes(32).toString('hex')
        return callback(null, `${randomName}${extname(file.originalname)}`)
    }
    })
  }))
  async changePicture(@UploadedFile() file: Express.Multer.File, @CurrentUser() user: User){
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
    var url = await cloudinary.uploader.upload(`public/uploads/${file.filename}`)
    // var url = {url: `${this.configService.get('URL')}/users/uploads/${file.filename}`}
    return await this.usersService.update(user.id, {avatar: url.url})
  }

  @Get('uploads/:path')
  async get(@Param('path') path, @Res() res: Response) {
      res.sendFile(path, { root: 'public/uploads' })
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
  async updatePassword(@CurrentUser() user: User, @Body() {current_password, password, confirm_password}: {current_password: string,password: string, confirm_password: string}) {
    await this.authService.dehash(user.password, current_password)
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
