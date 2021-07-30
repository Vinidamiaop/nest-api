import { Injectable } from '@nestjs/common';
import { Validator } from 'src/utils/validator';
import { PaginateDto } from '../../dtos/post/paginate.dto';
import { Contract } from '../contract';

@Injectable()
export class PaginateContract implements Contract {
  errors: any[];

  validate(model: PaginateDto): boolean {
    const validator = new Validator();

    validator.hasMaxValue(
      model.take,
      200,
      `Não é possível retornar ${model.take} registros. Valor máximo é 200 registros`,
    );

    this.errors = validator.errors;
    return validator.isValid();
  }
}
