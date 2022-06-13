import { Expose } from "class-transformer";
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vote{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'bool'})
    val: boolean

    @ManyToOne(() => User, user => user.votes,{cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User

    @ManyToOne(() => Post, post => post.votes, {cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    post: Post
}