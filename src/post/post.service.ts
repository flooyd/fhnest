//create posts service

import { Injectable } from '@nestjs/common';
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
    return this.postRepository.find({order: {createdAt: 'DESC'}});
  }


  async createPost(createPostDto: EditPostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.authorId = createPostDto.authorId;
    post.createdAt = new Date();
    post.updatedAt = new Date();
    return this.postRepository.save(post);
  }

  async updatePost(id: number, editPostDto: EditPostDto): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id: id } });
    post.title = editPostDto.title;
    post.content = editPostDto.content;
    post.authorId = editPostDto.authorId;
    post.updatedAt = new Date();
    return this.postRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  buildPostResponse(post: PostEntity): PostResponseInterface {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
    };
  }
}
