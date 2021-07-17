import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResultDto } from '../dtos/result.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public role: string) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const user: JwtPayload = context.switchToHttp().getRequest().user;

    if (!user.role) {
      throw new HttpException(
        new ResultDto('Acesso não autorizado', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }

    return next.handle();
  }
}
