//create posts service

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { EditPostDto } from './dto/editPost.dto';
import { PostResponseInterface } from './types/response';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll(): Promise<PostEntity[]> {
    return this.postRepository.find({order: {updatedAt: 'DESC'}});
  }


  async createPost(createPostDto: EditPostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.authorId = createPostDto.authorId;
    post.createdAt = new Date();
    post.updatedAt = new Date();
    return await this.postRepository.save(post);
  }

  async updatePost(id: number, editPostDto: EditPostDto): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id: id } });
    post.title = editPostDto.title;
    post.content = editPostDto.content;
    post.authorId = editPostDto.authorId;
    post.updatedAt = new Date();
    return this.postRepository.save(post);
  }

  async deletePost(id: number, user: any): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id: id } });
    if (post.authorId !== user.id) {
      throw new UnauthorizedException('You are not the author of this post');
    }
    await this.postRepository.delete(id);
  }

  buildPostResponse(post: PostEntity): PostResponseInterface {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
