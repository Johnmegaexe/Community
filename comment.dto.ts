// comment.dto.ts
export class CommentDto {
    readonly content: string;
    readonly parentCommentId?: number; // Optional for replies
  }
  