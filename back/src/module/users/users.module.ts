import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/User.entity';
import { Testimonial } from '../../entities/Testimonial.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';


@Module({
  imports: [TypeOrmModule.forFeature([User, Testimonial])],
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard, RolesGuard],
  exports: [UsersService], // Exporta el servicio de usuarios
})
export class UsersModule {}
