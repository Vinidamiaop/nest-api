import { Role } from '../entities/role.entity';

export class CreateUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public passwordHash: string,
    public birthDate: Date,
    public slug = firstName.toLowerCase().trim(),
    public roleId: Role,
  ) {}
}
