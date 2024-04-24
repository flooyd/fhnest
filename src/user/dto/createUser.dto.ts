import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly displayName: string;

  @IsNotEmpty()
  readonly password: string;
}
