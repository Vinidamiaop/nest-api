import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/shared/enums/role.enum';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/post/create-post.dto';
import { PaginateDto } from '../dtos/post/paginate.dto';
import { UpdatePostDto } from '../dtos/post/update-post.dto';
import { Post } from '../entities/post.entity';
import { UserService } from './user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async createPost(id: number, model: CreatePostDto) {
    const entity = this.repository.create(model);
    const user = await this.userService.findById(id);
    entity.author = user;
    return await this.repository.save(entity);
  }

  async findAll(options: PaginateDto) {
    if (!options.skip) options.skip = 0;
    if (!options.take) options.take = 25;
    return await this.repository.findAndCount({
      order: { createdAt: 'ASC' },
      loadRelationIds: true,
      skip: options.skip * options.take || 0,
      take: options.take,
    });
  }

  async findById(id) {
    return await this.repository.findOne({ id });
  }

  async findBySlug(slug) {
    return await this.repository.findOne({ slug: slug });
  }

  async update(id: number, req: any, model: UpdatePostDto) {
    const post = await this.repository.findOne(
      { id },
      { loadRelationIds: true },
    );
    if (!post) throw new NotFoundException();

    if (post.author !== req.user.id && req.user.role !== Role.Admin)
      throw new UnauthorizedException();
    const entity = this.repository.create(model);
    return await this.repository.update(id, entity);
  }

  async delete(id: number, req: any) {
    const post = await this.repository.findOne(
      { id },
      { loadRelationIds: true },
    );
    if (!post) throw new NotFoundException();

    if (post.author !== req.user.id && req.user.role !== Role.Admin)
      throw new UnauthorizedException();

    return await this.repository.delete(id);
  }
}
