import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from 'src/shared/services/auth.service';

import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { ProfileController } from './controllers/profile.controller';

import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';
import { Profile } from './entities/profile.entity';

import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { ProfileService } from './services/profile.service';

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
    TypeOrmModule.forFeature([User, Role, Profile]),
  ],
  controllers: [UserController, RoleController, ProfileController],
  providers: [
    UserService,
    RoleService,
    ProfileService,
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class BlogModule {}
