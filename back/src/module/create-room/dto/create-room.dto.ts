import { IsString, IsNumber, IsNotEmpty, IsPositive, Min, Max, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  /**
   * Título o nombre de la habitación.
   * @example "Habitación Deluxe"
   */
  @ApiProperty({ example: 'Habitación Deluxe', description: 'Título o nombre de la habitación.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Tamaño de la habitación.

   * @example "50m2"
   */
  @ApiProperty({ example: '50m2', description: 'Tamaño de la habitación.' })
  @IsString()
  @IsNotEmpty()
  size: string;

  /**
   * Número de camas en la habitación.
   * @example 2
   */
  @ApiProperty({ example: 2, description: 'Número de camas en la habitación.' })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(10)
  @Transform(({ value }) => parseInt(value, 10))
  beds: number;

  /**
   * Calificación promedio de la habitación.
   * @example 4.5
   */
  @ApiProperty({ example: 4.5, description: 'Calificación promedio de la habitación.' })
  @IsNumber()
  @Min(0)
  @Max(5)
  @Transform(({ value }) => parseFloat(value))
  rating: number;

  /**
   * URL de la imagen representativa de la habitación.
   * @example "https://example.com/room.jpg"
   */
  @ApiProperty({ example: 'https://example.com/room.jpg', description: 'URL de la imagen representativa de la habitación.' })
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida.' })
  image: string;

  /**
   * Precio de la habitación por noche.
   * @example 200.50
   */
  @ApiProperty({ example: 200.5, description: 'Precio de la habitación por noche.' })
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  /**
   * Tipo de habitación asociada.
   * @example "d230c7d9-b983-4e78-b846-944dbe62d7b1"
   */
  @ApiProperty({ example: 'Habitación de lujo', description: 'Tipo de habitación.' })
  @IsString()
  @IsNotEmpty()
  roomType: string;

  /**
   * Descripción detallada de la habitación.
   * @example "Habitación espaciosa con vistas al mar y todas las comodidades modernas."
   */
  @ApiProperty({ example: 'Habitación espaciosa con vistas al mar y todas las comodidades modernas.', description: 'Descripción detallada de la habitación.' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
