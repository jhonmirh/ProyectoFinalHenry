import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateVisitCounterDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  count?: number; 
}
