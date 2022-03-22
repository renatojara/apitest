import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEdgeJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  link: string;
}
