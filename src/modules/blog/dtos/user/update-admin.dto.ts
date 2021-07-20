import { Role } from '../../entities/role.entity';

export class UpdateAdminDto {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public birthDate?: Date,
    public passwordHash?: string,
    public slug?: string,
    public role?: Role,
  ) {}
}
