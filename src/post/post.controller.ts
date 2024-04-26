//create controller for post

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { EditPostDto } from './dto/editPost.dto';
import { PostResponseInterface } from './types/response';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('posts')
  async findAll(): Promise<PostResponseInterface[]> {
    const posts = await this.postService.findAll();
    return posts.map((post) => this.postService.buildPostResponse(post));
  }

  @Post('posts')
  async createPost(
    @Body('post') createPostDto: EditPostDto,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.createPost(createPostDto);
    return this.postService.buildPostResponse(post);
  }

  @Put('posts/:id')
  async updatePost(
    @Param('id') id: string,
    @Body('post') editPostDto: EditPostDto,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.updatePost(+id, editPostDto);
    return this.postService.buildPostResponse(post);
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    console.log('controller delete post', id)
    await this.postService.deletePost(+id);
  }
}
