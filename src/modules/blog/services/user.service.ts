import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { slugify } from 'src/utils/slugify';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async get(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { email: email },
    });
  }

  async create(user: CreateUserDto) {
    // TODO: Criar uma função para criar slugs
    // tirando os acentos e colocando tudo em lower case.

    user.slug = slugify(`${user.firstName} ${user.lastName}`);
    user.passwordHash = await bcryptjs.hash(user.passwordHash, 10);
    await this.repository.save(user);
  }

  async authenticate(email: string, password: string): Promise<any> {
    const user = await this.repository.find({
      where: { email: email },
      select: ['id', 'email', 'passwordHash', 'roleId'],
      relations: ['roleId'],
    });

    if (user.length === 0)
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.NOT_FOUND,
      );

    const passwordValidate = await bcryptjs.compare(
      password,
      user[0].passwordHash,
    );
    if (passwordValidate) {
      return user[0];
    } else {
      return null;
    }
  }
}
