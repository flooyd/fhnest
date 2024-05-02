import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/config';
import { UserResponseInterface, UsersResponse } from './types/response';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByUsername) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async editUser(id: number, data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    Object.assign(user, data);
    return await this.userRepository.save(user);
  }

  async setRole(adminUser: any, id: number, role: string): Promise<UserEntity> {
    if(adminUser.role !== 'admin') {
      throw new UnauthorizedException('You are not an admin');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    user.role = role;
    return await this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        'Invalid password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    const { id, username, bio, image, displayName, role } = user;
    const token = this.generateJwt(user);
    return {
      user: {
        id,
        username,
        bio,
        image,
        displayName,
        token,
        role
      },
    };
  }

  buildUsersResponse(users: UserEntity[]): UsersResponse[] {
    return users.map((user) => {
      const { id, username, bio, image, displayName, role } = user;
      return {
        id,
        username,
        bio,
        image,
        displayName,
        role
      };
    });
  }
}
