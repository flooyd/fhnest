import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { VoteService } from './vote.service';
import {
  VotesResponseInterface,
  VoteResponseInterface,
} from './types/response';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/decoraters/user.decorator';

@Controller()
export class VoteController {
  constructor(
    private readonly voteService: VoteService,
    private readonly postService: PostService,
  ) {}

  @Get('voteTypes')
  async getVoteTypes(): Promise<any[]> {
    return [
      {
        name: 'tommy',
        src: 'https://cdn.discordapp.com/emojis/662567954764005377.webp?size=48&quality=lossless',
      },
      {
        name: 'kappa',
        src: 'https://cdn.discordapp.com/emojis/682016019669188752.webp?size=48&quality=lossless',
      },
      {
        name: 'pepehappy',
        src: 'https://cdn.discordapp.com/emojis/613183495417888780.webp?size=96&quality=lossless',
      },
      {
        name: 'drakeya',
        src: 'https://cdn.discordapp.com/emojis/753649155968336014.webp?size=48&quality=lossless',
      },
      {
        name: 'pogmouth',
        src: 'https://cdn.discordapp.com/emojis/626685487251324939.webp?size=96&quality=lossless',
      },
    ];
  }
  @Get('votes/posts/:id')
  async findVotesForPost(
    @Param('id') id: number,
  ): Promise<VotesResponseInterface> {
    return await this.voteService.findVotesForPost(id);
  }

  @Post('votes/posts/:postId/:voteType')
  @UseGuards(AuthGuard)
  async editVoteForPost(
    @Param('postId') postId: number,
    @Param('voteType') voteType: string,
    @User() user: any,
  ): Promise<VoteResponseInterface> {
    const userId = user.id;
    const editedVote = await this.voteService.editVoteForPost(
      postId,
      voteType,
      userId,
    );
    if (editedVote === null) {
      return {
        voteType,
        postId,
        userId,
        id: null,
        commentId: null,
      };
    }
    return editedVote;
  }

  @Post('comments/:commentId/:voteType')
  async editVoteForComment(
    @Param('commentId') commentId: number,
    @Param('voteType') voteType: string,
  ): Promise<VoteResponseInterface> {
    const userId = 1;
    return await this.voteService.editVoteForComment(
      commentId,
      voteType,
      userId,
    );
  }
}
