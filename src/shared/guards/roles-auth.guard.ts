import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    try {
      const token = context
        .switchToHttp()
        .getRequest()
        .headers.authorization.split(' ');
      const user = await this.jwtService.verify(token[1], {
        secret: process.env.SECRET_KEY,
      });

      const req = context.switchToHttp().getRequest();
      req.user = { id: user.id, email: user.email, role: user.role };

      return requiredRoles.some((role) => role.includes(user?.role));
    } catch (err) {
      new UnauthorizedException();
    }
  }
}
