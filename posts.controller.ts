// posts.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './post.dto';
import { CommentDto } from './comment.dto'; // Create a CommentDto for creating comments

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() postDto: PostDto, @User() user: User) {
    // Implement post creation
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() postDto: PostDto) {
    // Implement post update
  }

  @Delete(':id')
  deletePost(@Param('id') id: number, @User() user: User) {
    // Implement post deletion
  }

  @Get()
  getPosts(@Query('category') category: number, @Query('sort') sort: string) {
    // Implement post fetching
  }

  @Get(':id')
  getPostDetails(@Param('id') id: number) {
    // Implement fetching post details
  }
  @Post(':id/upvote')
  upvotePost(@Param('id') postId: number, @User() user: User) {
    return this.postsService.upvotePost(postId, user);
  }

  @Post(':id/downvote')
  downvotePost(@Param('id') postId: number, @User() user: User) {
    return this.postsService.downvotePost(postId, user);
  }

  @Post(':id/comments')
  createComment(@Param('id') postId: number, @Body() commentDto: CommentDto, @User() user: User) {
    return this.postsService.createComment(postId, commentDto, user);
  }

  @Get(':id/comments')
  getComments(@Param('id') postId: number) {
    return this.postsService.getComments(postId);
  }

  @Post('comments/:id/reply')
  replyToComment(@Param('id') commentId: number, @Body() commentDto: CommentDto, @User() user: User) {
    return this.postsService.replyToComment(commentId, commentDto, user);
  }
}
