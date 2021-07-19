import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { LoginUserDto } from '../../dtos/login-user.dto';
import { Contract } from '../contract';

@Injectable()
export class AuthUserContract implements Contract {
  errors: any[];

  validate(model: LoginUserDto): boolean {
    const validator = new Validator();

    validator.hasMinLen(
      model.password,
      6,
      'Senha precisa ter mais de 6 caracteres',
    );
    validator.isEmail(model.email, 'Email inválido.');

    this.errors = validator.errors;
    return validator.isValid();
  }
}
