import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { Role } from 'src/shared/enums/role.enum';
import { RolesAuthGuard } from 'src/shared/guards/roles-auth.guard';
import { UserProfileDto } from '../dtos/user/user-profile.dto';
import { ProfileService } from '../services/profile.service';
import { UserService } from '../services/user.service';

@Controller('v1/profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(RolesAuthGuard)
  @Roles(Role.Admin, Role.Editor, Role.User)
  @Put()
  async update(@Req() req, @Body() model: UserProfileDto) {
    try {
      const user = await this.userService.findById(req.user.id);
      await this.profileService.update(Number(user.profile), model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível atualizar perfil.',
          false,
          null,
          'Something went wrong.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id) {
    try {
      const profile = await this.profileService.getOne(id);
      return new ResultDto(null, true, profile, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Não foi possível listar perfil.',
          false,
          null,
          'Something went wrong.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
