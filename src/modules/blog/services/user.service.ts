import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async get(): Promise<User[]> {
    return await this.repository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'slug', 'birthDate'],
    });
  }

  async getOne(id: string): Promise<User> {
    return await this.repository.findOne({
      where: { id: id },
      select: ['id', 'firstName', 'lastName', 'email', 'slug', 'birthDate'],
    });
  }

  async create(user: User) {
    user.slug =
      user.firstName.toLowerCase().trim() +
      '-' +
      user.lastName.toLowerCase().trim();
    user.createdAt = new Date(Date.now());
    user.updatedAt = new Date(Date.now());
    await this.repository.save(user);
  }
}
