export class UpdateUserDto {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public birthDate?: Date,
    public password?: string,
    public slug?: string,
  ) {}
}
