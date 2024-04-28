import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    content: string;

    @IsNumber()
    authorId: number;

    @IsNumber()
    postId: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}