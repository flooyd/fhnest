import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/decoraters/user.decorator';
import { CommentEntity } from './comment.entity';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('comments')
  @UseGuards(AuthGuard)
  async create(@Body() createCommentDto: CreateCommentDto, @User() user: any): Promise<CommentEntity> {
    return await this.commentsService.create(createCommentDto, user.id);
  }

  @Get('comments/:postId')
  @UseGuards(AuthGuard)
  async findAllForPost(@Param('postId') postId: string): Promise<CommentEntity[]> {
    return await this.commentsService.findAllForPost(+postId);
  }

  @Get('comments/:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch('comments/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @User() user: any,) {
    return this.commentsService.update(+id, user, updateCommentDto);
  }

  @Delete('comments/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @User() user: any) {
    return this.commentsService.remove(+id, user.id);
  }
}
