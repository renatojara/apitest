import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditEdgeJobDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  link?: string;
}
