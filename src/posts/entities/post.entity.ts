import { User } from "src/users/entities/user.entity";
import { Vote } from "src/votes/vote.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    content: string

    @ManyToOne(() => User, user => user.posts, {cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User

    @OneToMany(() => Vote, vote => vote.post)
    votes: Vote[]

    get author(): string{
        return `${this.user.first_name} ${this.user.last_name}`
    }
}
