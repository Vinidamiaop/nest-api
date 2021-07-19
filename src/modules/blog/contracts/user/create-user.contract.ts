import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { Contract } from '../contract';

@Injectable()
export class CreateUserContract implements Contract {
  errors: any[];

  validate(model: CreateUserDto): boolean {
    const validator = new Validator();

    validator.hasMinLen(model.firstName, 3, 'Nome inválido');
    validator.hasMinLen(model.lastName, 3, 'Sobrenome inválido');
    validator.hasMinLen(
      model.passwordHash,
      6,
      'Password precisa ter mais de 6 caracteres.',
    );
    validator.isEmail(model.email, 'Email inválido.');
    validator.isRequired(model.roleId, 'Role is required.');
    this.errors = validator.errors;
    return validator.isValid();
  }
}
