import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { RolesAuthGuard } from 'src/shared/guards/roles-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { ResultDto } from 'src/shared/dtos/result.dto';

import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from '../services/user.service';

import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { User } from '../entities/user.entity';

import { PasswordInterceptor } from '../interceptors/password.interceptor';

@Controller('v1/users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(RolesAuthGuard)
  @Roles(Role.Admin)
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
  @UseGuards(RolesAuthGuard)
  @Roles(Role.Admin, Role.Editor, Role.User)
  @Get('/show')
  async findOneById(@Request() req) {
    try {
      const user = await this.service.findById(req.user.id);
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

  @UseInterceptors(PasswordInterceptor)
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

  @Post('authenticate')
  async authenticate(@Body() model: LoginUserDto): Promise<any> {
    try {
      const user: User = await this.service.authenticate(
        model.email,
        model.password,
      );

      if (!user) {
        throw new HttpException(
          new ResultDto('Usuário ou senha inválidos', false, null, null),
          HttpStatus.NOT_FOUND,
        );
      }

      const token = await this.authService.createToken(
        user.id,
        user.email,
        user.roleId.slug,
      );

      return new ResultDto(null, true, token, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possivel fazer login.',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}