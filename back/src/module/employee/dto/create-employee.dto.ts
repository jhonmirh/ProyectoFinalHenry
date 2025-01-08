import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  birthdate: Date;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  role: string;
}
