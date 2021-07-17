import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { slugify } from 'src/utils/slugify';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async get(): Promise<User[]> {
    return await this.repository.find();
  }

  async getOne(id: string): Promise<User> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async create(user: CreateUserDto) {
    // TODO: Criar uma função para criar slugs
    // tirando os acentos e colocando tudo em lower case.

    user.slug = slugify(`${user.firstName} ${user.lastName}`);
    await this.repository.save(user);
  }
}
