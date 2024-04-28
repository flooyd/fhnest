//create controller for post

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { EditPostDto } from './dto/editPost.dto';
import { PostResponseInterface } from './types/response';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/decoraters/user.decorator';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('posts')
  @UseGuards(AuthGuard)
  async findAll(): Promise<PostResponseInterface[]> {
    const posts = await this.postService.findAll();
    return posts.map((post) => this.postService.buildPostResponse(post));
  }

  @Post('posts')
  @UseGuards(AuthGuard)
  async createPost(
    @Body('post') createPostDto: EditPostDto,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.createPost(createPostDto);
    return this.postService.buildPostResponse(post);
  }

  @Put('posts/:id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body('post') editPostDto: EditPostDto,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.updatePost(+id, editPostDto);
    return this.postService.buildPostResponse(post);
  }

  @Delete('posts/:id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: string, @User() user: any): Promise<void> {
    await this.postService.deletePost(+id, user);
  }
}
