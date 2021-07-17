import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('v1/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.service.get();
      return new ResultDto(null, true, users, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possivel listar usuários.',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    try {
      const user = await this.service.getOne(id);
      return new ResultDto(null, true, user, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possivel listar usuários.',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async create(@Body() model: CreateUserDto) {
    try {
      await this.service.create(model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possivel criar novo usuário.',
          false,
          model,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
