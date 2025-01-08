import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './User.entity';
import { TestimonialStatus } from '../enums/testimonial-status.enum';

@Entity({ name: 'testimonials' })
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre del usuario que envía el testimonio.
   * @example 'Jane Doe'
   */
  @ApiProperty({
    example: 'Jane Doe',
    description: 'Nombre del usuario que envía el testimonio.',
  })
  @Column({ length: 50 })
  username: string;

  /**
   * Correo del usuario.
   * @example 'jane.doe@example.com'
   */
  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'Correo del usuario que envía el testimonio.',
  })
  @Column()
  email: string;

  /**
   * Contenido del testimonio.
   * @example 'This app is amazing!'
   */
  @ApiProperty({
    example: 'This app is amazing!',
    description: 'Contenido del testimonio (máximo 50 caracteres).',
  })
  @Column({ length: 50 })
  testimonial: string;

  /**
   * Calificación del testimonio.
   * @example 5
   */
  @ApiProperty({
    example: 5,
    description: 'Calificación del testimonio (número entre 1 y 5).',
  })
  @Column({ type: 'int', width: 1 })
  rating: number;

  /**
   * Estado del testimonio (pendiente o publicado).
   * @example 'pending'
   */
  @ApiProperty({
    example: 'pending',
    description: 'Estado del testimonio (pending o published).',
  })
  @Column({
    type: 'enum',
    enum: TestimonialStatus,
    default: TestimonialStatus.PENDING,
  })
  status: TestimonialStatus;

  /**
   * Relación con la entidad User (un testimonio está asociado a un usuario).
   */
  @ManyToOne(() => User, (user) => user.testimonials, { nullable: false }) // Relación ManyToOne
  @JoinColumn({ name: 'user_id' })
  user: User;
}
