import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  VoteResponseInterface,
  VotesResponseInterface,
} from './types/response';
import { VoteEntity } from './vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>,
  ) {}

  async findVotesForPost(id: number): Promise<VotesResponseInterface> {
    const votes = await this.voteRepository.find({ where: { postId: id } });
    return {
      votes,
    };
  }

  async findVotesForComment(id: number): Promise<VotesResponseInterface> {
    const votes = await this.voteRepository.find({ where: { commentId: id } });
    return {
      votes,
    };
  }

  async editVoteForPost(
    postId: number,
    voteType: string,
    userId: number,
  ): Promise<VoteResponseInterface> {
    const vote = await this.voteRepository.findOne({
      where: { postId, userId, voteType },
    });
    if (vote) {
      await this.voteRepository.remove(vote);
    } else {
      await this.voteRepository.insert({ postId, userId, voteType });
    }
    return await this.voteRepository.findOne({
      where: { postId, userId, voteType },
    });
  }

  async editVoteForComment(
    commentId: number,
    voteType: string,
    userId: number,
  ): Promise<VoteResponseInterface> {
    const vote = await this.voteRepository.findOne({
      where: { commentId, userId, voteType },
    });
    if (vote) {
      await this.voteRepository.remove(vote);
    } else {
      await this.voteRepository.insert({ commentId, userId, voteType });
    }
    return await this.voteRepository.findOne({
      where: { commentId, userId, voteType },
    });
  }
}
