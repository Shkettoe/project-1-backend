import { Exclude, Expose, Transform } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class PostDto{
    @Exclude()
    updated_at: Date

    @Transform(({value}) => {return {id: value.id, first_name: value.first_name, last_name: value.last_name}})
    user: User
}
