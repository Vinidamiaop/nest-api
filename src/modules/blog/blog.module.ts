import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController],
})
export class BlogModule {}
