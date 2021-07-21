import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/category/CreateCategory.dto';
import { UpdateCategoryDto } from '../dtos/category/UpdateCategory.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(model: CreateCategoryDto) {
    const category = this.repository.create(model);
    return await this.repository.save(category);
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id, model: UpdateCategoryDto) {
    const category = this.repository.create(model);
    return await this.repository.update({ id: id }, category);
  }

  async delete(id) {
    const category = await this.repository.findOne({ id });
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    await this.repository.delete({ id });
  }
}
