import { IsString, IsNumber, Min, Max, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MinLength(2)
  title!: string; 

  @IsString()
  genre!: string; 

  @IsNumber()
  @Min(0)
  @Max(10)
  rating!: number; 
}