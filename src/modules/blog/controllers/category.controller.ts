import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { Role } from 'src/shared/enums/role.enum';
import { RolesAuthGuard } from 'src/shared/guards/roles-auth.guard';
import { CreateCategoryDto } from '../dtos/category/CreateCategory.dto';
import { UpdateCategoryDto } from '../dtos/category/UpdateCategory.dto';
import { CategoryService } from '../services/category.service';

@Controller('/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    try {
      const categories = await this.categoryService.findAll();
      return new ResultDto(null, true, categories, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível listar as categorias',
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
  @Post()
  async post(@Body() model: CreateCategoryDto) {
    try {
      await this.categoryService.create(model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível criar uma nova categoria',
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
  async update(@Body() model: UpdateCategoryDto, @Param('id') id) {
    try {
      await this.categoryService.update(id, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar a categoria',
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
  @Delete('/:id')
  async delete(@Param('id') id) {
    try {
      await this.categoryService.delete(id);
      return new ResultDto('Categoria excluída com sucesso', true, null, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível excluir a categoria',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
