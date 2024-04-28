import { UserEntity } from '../user.entity';

export type UserResponse = Omit<
  UserEntity,
  'password' | 'hashPassword' | 'comparePassword'
> & {
  token: string;
};

export interface UserResponseInterface {
  user: UserResponse;
}

export type UsersResponse = Omit<UserEntity, 'password' | 'hashPassword' | 'comparePassword' | 'username'>;

export interface UsersResponseInterface {
  users: UsersResponse[];
}
