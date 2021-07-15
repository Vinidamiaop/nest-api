export class CreateUserCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly slug: string,
    public readonly birthDate: Date,
    public readonly createdAt: Date,
  ) {}
}
