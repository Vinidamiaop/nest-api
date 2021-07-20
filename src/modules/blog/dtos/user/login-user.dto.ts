export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
