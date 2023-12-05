// vote.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'upvote' | 'downvote';

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Post, post => post.votes)
  post: Post;
}
