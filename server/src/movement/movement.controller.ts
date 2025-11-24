import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { MovementService } from './movement.service';
import { TrackMovementDto } from './dto/track-movement.dto';
import { Movement } from './movement.entity';

@ApiTags('movements')
@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  @ApiOperation({ summary: 'Add a movement event by the user' })
  @ApiBody({ type: TrackMovementDto })
  @ApiResponse({
    status: 201,
    description: 'Movement recorded successfully',
    type: Movement,
  })
  async trackMovement(@Body() body: TrackMovementDto): Promise<Movement> {
    return this.movementService.trackMovement(body);
  }

  @Get('session/:sessionId/last')
  @ApiOperation({ summary: 'Get last saved location for a session' })
  @ApiParam({
    name: 'sessionId',
    type: String,
    description:
      'Unique session ID generated client side using crypto.randomUUID()',
    example: 'f81e7af3-fcf4-4cdd-b3a3-14a8087aa191',
  })
  @ApiResponse({
    status: 200,
    description: 'List of last saved location for the given session',
    type: Movement, // Should probably createa a specific response here
  })
  @ApiNotFoundResponse({
    description: 'No movements found for this session',
  })
  async getLast(@Param('sessionId') sessionId: string) {
    const last =
      await this.movementService.getLastMovementForSession(sessionId);

    if (!last)
      throw new NotFoundException('No movements found for this session');

    return {
      x: last.x,
      y: last.y,
      heading: last.heading,
    };
  }
}
