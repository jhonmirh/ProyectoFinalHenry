import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/User.entity';
import { Testimonial } from '../../entities/Testimonial.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Testimonial])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporta el servicio de usuarios
})
export class UsersModule {}
