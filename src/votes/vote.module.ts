import { Module } from '@nestjs/common';
import { VoteEntity } from './vote.entity';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { PostEntity } from 'src/post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteEntity]),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [VoteController],
  providers: [VoteService, PostService],
})
export class VoteModule {}
