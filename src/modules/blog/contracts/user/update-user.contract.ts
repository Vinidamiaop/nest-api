import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { UpdateAdminDto } from '../../dtos/user/update-admin.dto';
import { Contract } from '../contract';

Injectable();
export class UpdateUserContract implements Contract {
  errors: any[];
  validate(model: UpdateAdminDto) {
    const validator = new Validator();

    if (typeof model.firstName !== 'undefined')
      validator.hasMinLen(model.firstName, 3, 'Nome inválido');

    if (typeof model.lastName !== 'undefined')
      validator.hasMinLen(model.lastName, 3, 'Sobrenome inválido');

    if (typeof model.passwordHash !== 'undefined')
      validator.hasMinLen(
        model.passwordHash,
        6,
        'Senha precisa ter mais de 6 caracteres.',
      );

    if (typeof model.email !== 'undefined')
      validator.isEmail(model.email, 'Email inválido.');

    if (typeof model.slug !== 'undefined')
      validator.hasOnlyLetters(model.slug, 'Slug pode conter apenas letras.');

    this.errors = validator.errors;

    return validator.isValid();
  }
}
