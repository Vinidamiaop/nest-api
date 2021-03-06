import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from 'src/modules/blog/contracts/contract';
import { ResultDto } from '../dtos/result.dto';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const body = context.switchToHttp().getRequest().body;

    const validBody = this.contract.validate(body);

    if (!validBody) {
      throw new HttpException(
        new ResultDto(
          'Something went wrong.',
          false,
          null,
          this.contract.errors,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    return next.handle();
  }
}
