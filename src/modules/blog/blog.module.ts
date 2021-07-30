import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

import { CategoryController } from './controllers/category.controller';
import { ProfileController } from './controllers/profile.controller';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';

import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Category } from './entities/category.entity';

import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { ProfileService } from './services/profile.service';
import { CategoryService } from './services/category.service';
import { Post } from './entities/post.entity';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';

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
    TypeOrmModule.forFeature([User, Role, Profile, Category, Post]),
  ],
  controllers: [
    UserController,
    RoleController,
    ProfileController,
    CategoryController,
    PostController,
  ],
  providers: [
    UserService,
    RoleService,
    ProfileService,
    CategoryService,
    PostService,
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class BlogModule {}
