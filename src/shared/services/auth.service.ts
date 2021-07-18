import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/blog/services/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginUserDto } from 'src/modules/blog/dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: LoginUserDto): Promise<any> {
    const user = await this.userService.authenticate(
      payload.email,
      payload.password,
    );
    if (user) {
      return user;
    }
    return null;
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
