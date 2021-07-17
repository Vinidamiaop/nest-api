import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [UserService, RoleService, AuthService, JwtStrategy],
  controllers: [UserController, RoleController],
})
export class BlogModule {}
