import { IsOptional, IsString } from 'class-validator';

export class SearchBusinessDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  category?: string;
}