import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsInt, Min, Max } from 'class-validator';
export class CreateTestimonialDto {
  @ApiProperty({ description: 'Contenido del testimonio', example: 'This app is amazing!' })
  @IsString()
  @MaxLength(50)
  message: string;


  @ApiProperty({ description: 'Calificación del testimonio', example: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
