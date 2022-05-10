import { Exclude, Expose } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    content: string

    @ManyToOne(() => User, user => user.posts)
    @Exclude()
    user: User

    @Expose()
    get author(): string{
        return `${this.user.first_name} ${this.user.last_name}`
    }
}
