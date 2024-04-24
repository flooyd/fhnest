import { IsNotEmpty } from 'class-validator';

export class EditVoteDTO {
  readonly id: number;
  @IsNotEmpty()
  readonly userId: number;
  readonly postId: number;
  readonly commentId: number;
  @IsNotEmpty()
  readonly voteType: string;
}
