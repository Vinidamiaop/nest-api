import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../dtos/image/create-image.dto';
import { Image } from '../entities/image.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly repository: Repository<Image>,
  ) {}

  async get() {
    return await this.repository.find();
  }

  async getOne(id: number) {
    return await this.repository.findOne({ id });
  }

  async create(model: CreateImageDto) {
    const url = `${process.env.APP_URL}/${model.url}`;
    const entity = this.repository.create({
      url: url,
      filename: model.filename,
      title: model.title,
    });
    return await this.repository.save(entity);
  }

  async delete(id: number) {
    const image: Image = await this.repository.findOne({ id });
    if (!image) throw new NotFoundException('Imagem não encontrada');
    const filePath = path.resolve(__dirname, '..', '..', '..', 'uploads');
    fs.unlink(`${filePath}\\${image.filename}`);
    return await this.repository.delete(id);
  }
}
