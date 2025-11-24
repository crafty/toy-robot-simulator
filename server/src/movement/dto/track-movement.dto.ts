import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PositionDto } from './position.dto';

export class TrackMovementDto {
  @ApiProperty({
    example: 'f81e7af3-fcf4-4cdd-b3a3-14a8087aa191',
    description:
      'Unique session ID generated client side using crypto.randomUUID()',
  })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({
    type: () => PositionDto,
    description: 'Current position of the robot',
  })
  @ValidateNested()
  @Type(() => PositionDto)
  position: PositionDto;
}
