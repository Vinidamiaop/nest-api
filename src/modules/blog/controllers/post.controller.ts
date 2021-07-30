import {
  Controller,
  UseGuards,
  Post,
  HttpException,
  HttpStatus,
  Body,
  Req,
  Get,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { Role } from 'src/shared/enums/role.enum';
import { RolesAuthGuard } from 'src/shared/guards/roles-auth.guard';
import { CreatePostDto } from '../dtos/post/create-post.dto';
import { PostService } from '../services/post.service';

@Controller('/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(RolesAuthGuard)
  @Roles(Role.Admin, Role.Editor)
  @Post()
  async create(@Body() model: CreatePostDto, @Req() req) {
    try {
      await this.postService.createPost(req.user.id, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível criar um novo post',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAll() {
    try {
      const posts = await this.postService.findAll();
      return new ResultDto(null, true, posts, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível listar todos os posts',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/single/:slug')
  async getBySlug(@Param('slug') slug) {
    try {
      const posts = await this.postService.findBySlug(slug);
      if (!posts) throw new NotFoundException('Post não encontrado.');
      return new ResultDto(null, true, posts, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível listar o post',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  async getById(@Param('id') id) {
    try {
      const posts = await this.postService.findById(id);
      if (!posts) throw new NotFoundException('Post não encontrado.');
      return new ResultDto(null, true, posts, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível listar o post',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(RolesAuthGuard)
  @Roles(Role.Admin, Role.Editor)
  @Put('/:id')
  async update(@Param('id') id, @Body() model, @Req() req) {
    try {
      const posts = await this.postService.update(id, req, model);
      if (!posts) throw new NotFoundException('Post não encontrado.');
      return new ResultDto(null, true, posts, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar o post',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
