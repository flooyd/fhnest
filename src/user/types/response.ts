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
