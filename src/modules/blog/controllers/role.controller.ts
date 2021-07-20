import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { Role } from 'src/shared/enums/role.enum';
import { RolesAuthGuard } from 'src/shared/guards/roles-auth.guard';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateRoleContract } from '../contracts/role/create-role.contract';
import { RoleDto } from '../dtos/role/role.dto';
import { RoleService } from '../services/role.service';

@Controller('v1/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseInterceptors(new ValidatorInterceptor(new CreateRoleContract()))
  @UseGuards(RolesAuthGuard)
  @Roles(Role.Admin, Role.Editor)
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
