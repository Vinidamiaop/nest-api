import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { CreatePostDto } from '../../dtos/post/create-post.dto';
import { Contract } from '../contract';

@Injectable()
export class CreatePostContract implements Contract {
  errors: any[];
  validate(model: CreatePostDto) {
    const validator = new Validator();
    validator.isRequired(model.title, 'title inválido');
    validator.isRequired(model.summary, 'summary inválido');
    validator.isRequired(model.body, 'body inválido');

    this.errors = validator.errors;
    return validator.isValid();
  }
}
