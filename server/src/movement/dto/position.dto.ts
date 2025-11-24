import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum } from 'class-validator';
import { Heading } from '../heading.enum';

export class PositionDto {
  @ApiProperty({ example: 0, description: 'X coordinate' })
  @IsInt()
  x: number;

  @ApiProperty({ example: 0, description: 'Y coordinate' })
  @IsInt()
  y: number;

  @ApiProperty({
    example: Heading.NORTH,
    description: 'The direction the robot is facing',
  })
  @IsEnum(Heading)
  heading: Heading;
}
