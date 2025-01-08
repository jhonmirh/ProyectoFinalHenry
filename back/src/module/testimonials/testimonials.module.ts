import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { Testimonial } from '../../entities/Testimonial.entity';
import { User } from '../../entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial, User])],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
