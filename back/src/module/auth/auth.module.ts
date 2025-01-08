import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { Role } from 'src/entities/role.entity';
import { UsersModule } from '../users/users.module'; //// GOOGLE LOGIN

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]),RolesModule, UsersModule], //// GOOGLE LOGIN UsersModule
  controllers: [AuthController],
  providers: [AuthService, NotificationsService, RolesService, UsersModule ],
  exports: [AuthService]
})
export class AuthModule {}
