import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const user: CreateUserDto = await context.switchToHttp().getRequest().body;

    user.passwordHash = await bcryptjs.hash(user.passwordHash, 10);

    return next.handle();
  }
}
