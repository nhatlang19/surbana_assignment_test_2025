import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JoinColumn, TreeParent } from 'typeorm';

export class CreateLocationDto {
  @ApiProperty({ description: 'Name of the location' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Location number (unique identifier)' })
  @IsString()
  location_name: string;

  @ApiProperty({ description: 'Area in square meters' })
  @IsNumber()
  @Min(0)
  area: number;

  @ApiPropertyOptional({ description: 'Parent location ID' })
  @IsOptional()
  @JoinColumn({ name: 'parent_id' })
  parent_id?: number;
}
