import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { RoleDto } from '../dtos/role.dto';
import { RoleService } from '../services/role.service';

@Controller('v1/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async post(@Body() model: RoleDto) {
    try {
      await this.roleService.create(model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possivel criar novo role.',
          false,
          model,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get()
  async get() {
    try {
      const roles = await this.roleService.findAll();
      return new ResultDto(null, true, roles, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possivel listar roles.',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
