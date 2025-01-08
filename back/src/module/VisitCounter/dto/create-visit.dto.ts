import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsNotEmpty()
  @IsString()
  ip: string;
}
