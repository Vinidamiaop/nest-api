import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from '../dtos/role/role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(role: RoleDto) {
    role.slug = role.name.toString().toLowerCase().trim();
    await this.repository.save(role);
  }

  async findAll() {
    return this.repository.find();
  }
}
