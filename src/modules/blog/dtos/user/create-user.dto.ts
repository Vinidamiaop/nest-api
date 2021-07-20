import { Profile } from '../../entities/profile.entity';

export class CreateUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public passwordHash: string,
    public profile: Profile,
    public slug?: string,
  ) {}
}
