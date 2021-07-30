import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { UpdatePostDto } from '../../dtos/post/update-post.dto';
import { Contract } from '../contract';

@Injectable()
export class UpdatePostContract implements Contract {
  errors: any[];
  validate(model: UpdatePostDto) {
    const validator = new Validator();

    if (typeof model.title !== 'undefined')
      validator.isRequired(model.title, 'title inválido');

    if (typeof model.summary !== 'undefined')
      validator.isRequired(model.summary, 'summary inválido');

    if (typeof model.body !== 'undefined')
      validator.isRequired(model.body, 'body inválido');

    this.errors = validator.errors;
    return validator.isValid();
  }
}
