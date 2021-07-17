import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { AuthService } from 'src/shared/services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { User } from '../entities/user.entity';
import { PasswordInterceptor } from '../interceptors/password.interceptor';
import { UserService } from '../services/user.service';

@Controller('v1/users')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly authService: AuthService,
  ) {}

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
      const user = await this.service.findById(id);
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
        user.roleId,
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
