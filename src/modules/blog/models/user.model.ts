import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private id: string,
    private firstName: string,
    private lastName: string,
    private email: string,
    private passwordHash: string,
    private slug: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {
    super();
  }
  // async create(user: User) {}
}
