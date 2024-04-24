import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/response';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './decoraters/user.decorator';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users/register')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async findAll(): Promise<UserResponseInterface[]> {
    const users = await this.userService.findAll();
    return users.map((user) => this.userService.buildUserResponse(user));
  }

  @Post('users/login')
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Put('users')
  @UseGuards(AuthGuard)
  async editUser(
    @Body('user') createUserDto: CreateUserDto,
    @User() user: any,
  ): Promise<UserResponseInterface> {
    const editedUser = await this.userService.editUser(user.id, createUserDto);
    return this.userService.buildUserResponse(editedUser);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async findCurrentUser(@User() user: any): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
