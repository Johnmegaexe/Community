// posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';
import { User } from './user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async createPost(postDto: PostDto, user: User): Promise<Post> {
    // Implement post creation logic
  }

  async updatePost(id: number, postDto: PostDto): Promise<Post> {
    // Implement post update logic
  }

  async deletePost(id: number, user: User): Promise<void> {
    // Implement post deletion logic
  }

  async getPosts(category?: number, sort?: string): Promise<Post[]> {
    // Implement post fetching logic with optional category and sorting
  }

  async getPostDetails(id: number): Promise<Post> {
    // Implement fetching post details
  }

  async upvotePost(postId: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingVote = await this.voteRepository.findOne({
      where: { post: { id: postId }, user: { id: user.id } },
    });

    if (existingVote) {
      // User already voted, handle accordingly (e.g., remove vote)
    } else {
      const newVote = new Vote();
      newVote.type = 'upvote';
      newVote.user = user;
      newVote.post = post;
      await this.voteRepository.save(newVote);

      // Increment the upvote count on the post
      post.upvoteCount++;
      await this.postRepository.save(post);
    }
  }
  
  async downvotePost(postId: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingVote = await this.voteRepository.findOne({
      where: { post: { id: postId }, user: { id: user.id } },
    });

    if (existingVote) {
      // User already voted, handle accordingly (e.g., remove vote)
    } else {
      const newVote = new Vote();
      newVote.type = 'downvote';
      newVote.user = user;
      newVote.post = post;
      await this.voteRepository.save(newVote);

      // Increment the downvote count on the post
      post.downvoteCount++;
      await this.postRepository.save(post);
    }
  }

  async createComment(postId: number, commentDto: CommentDto, user: User): Promise<Comment> {
    const post = await this.postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const newComment = new Comment();
    newComment.content = commentDto.content;
    newComment.user = user;
    newComment.post = post;

    if (commentDto.parentCommentId) {
      const parentComment = await this.commentRepository.findOne(commentDto.parentCommentId);
      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }
      newComment.parent = parentComment;
    }

    return await this.commentRepository.save(newComment);
  }

  async getComments(postId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user', 'parent'], // Load user and parent comment details
    });
  }

  async replyToComment(commentId: number, commentDto: CommentDto, user: User): Promise<Comment> {
    const parentComment = await this.commentRepository.findOne(commentId);

    if (!parentComment) {
      throw new NotFoundException('Parent comment not found');
    }

    const newComment = new Comment();
    newComment.content = commentDto.content;
    newComment.user = user;
    newComment.post = parentComment.post;
    newComment.parent = parentComment;

    return await this.commentRepository.save(newComment);
  }
}
