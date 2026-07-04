import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';

export class FilterAppointmentsDto {

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  }) 
  @IsBoolean()
  isUpcoming?: boolean;
}