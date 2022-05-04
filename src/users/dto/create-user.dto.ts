import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsString() @MinLength(8) @MaxLength(32)
    password: string

    avatar: string
}
