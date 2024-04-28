import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
    @IsString()
    content: string;

    @IsNotEmpty()
    authorId: number;

    @IsNumber()
    postId: number;

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
