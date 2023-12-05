// post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @Column()
  categoryId: number;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Vote, vote => vote.post)
  votes: Vote[];
}
