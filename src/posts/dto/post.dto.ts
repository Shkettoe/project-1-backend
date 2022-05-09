import { Exclude, Expose } from "class-transformer"
import { IsObject, IsString } from "class-validator"
import { UserDto } from "src/users/dto/user.dto"
import { User } from "src/users/entities/user.entity"

export class PostDto{
    @Expose()
    content: string

    @Expose()
    user: User
}
