import { IsNotEmpty } from 'class-validator';

export class EditPostDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly authorId: number;

  @IsNotEmpty()
  readonly updatedAt: Date;

  readonly createdAt: Date;
}
