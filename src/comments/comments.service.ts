import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>) {}
  async create(createCommentDto: CreateCommentDto, userId: number): Promise<CommentEntity> {
    createCommentDto.createdAt = new Date();
    createCommentDto.updatedAt = new Date();
    return await this.commentRepository.save({ ...createCommentDto, authorId: userId });
  }

  async findAllForPost(postId: number): Promise<CommentEntity[]> {
    return await this.commentRepository.find({ where: { postId } });
  }

  //I don't think I will use this soon. I do have some ideas though.
  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: number, userId: number, updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if(comment.authorId !== userId) {
      throw new UnauthorizedException('You are not the author of this comment');
    }
    comment.updatedAt = new Date();
    return await this.commentRepository.save({ ...comment, ...updateCommentDto });
  }

 async remove(id: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if(comment.authorId !== userId) {
      throw new UnauthorizedException('You are not the author of this comment');
    }
    await this.commentRepository.delete(id);
  }
}
