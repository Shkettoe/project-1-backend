import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreatePostDto{ 
    @IsString() @MinLength(3)
    content: string

    @IsNumber() @IsNotEmpty()
    user: User
}
