import { ConfigService } from "@nestjs/config";
import { Post } from "src/posts/entities/post.entity";
import { Vote } from "src/votes/vote.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
require('dotenv').config()

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    first_name: string

    @Column({nullable: false})
    last_name: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string

    @Column({default: `https://res.cloudinary.com/hltwyr1hg/image/upload/v1655724330/default_mlgmtf.png`})
    // @Column({default: `${process.env.URL}/users/uploads/default.png`})
    avatar: string

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @OneToMany(() => Vote, vote => vote.user)
    votes: Vote[]
}
