import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UpdateAdminDto } from '../dtos/user/update-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async get(): Promise<User[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<User | undefined> {
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
    const entity = this.repository.create(user);
    await this.repository.save(entity);
  }

  async update(id: number, user: UpdateUserDto) {
    const entity = this.repository.create(user);
    return await this.repository.update(id, entity);
  }

  async updateAsAdmin(id: number, model: UpdateAdminDto) {
    const user = await this.repository.findOne({ id });
    if (!user) throw new NotFoundException();
    const entity = this.repository.create(model);
    return await this.repository.update(id, entity);
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

  async delete(id: number) {
    const user = await this.repository.findOne({ id: id });
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.repository.delete(user);
  }
}
