import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { RoleDto } from '../../dtos/role/role.dto';
import { Contract } from '../contract';

@Injectable()
export class CreateRoleContract implements Contract {
  errors: any[];
  validate(model: RoleDto): boolean {
    const validator = new Validator();

    validator.isRequired(model.name, 'Nome inválido');

    this.errors = validator.errors;
    return validator.isValid();
  }
}
