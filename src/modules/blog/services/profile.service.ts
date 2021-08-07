import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileDto } from '../dtos/user/user-profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {}

  async create(model: UserProfileDto) {
    return await this.repository.save(model);
  }
  async getOne(id: number) {
    const profile = await this.repository.findOne({ id });
    if (!profile) throw new NotFoundException('Perfil não encontrado.');

    return profile;
  }

  async update(id: number, model: UserProfileDto) {
    return await this.repository.update({ id }, model);
  }
}
