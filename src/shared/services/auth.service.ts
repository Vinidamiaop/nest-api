import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/blog/services/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload;
  }

  async createToken(id, email, role) {
    const user: JwtPayload = {
      id: id,
      email: email,
      role: role,
    };

    return this.jwtService.sign(user);
  }
}
