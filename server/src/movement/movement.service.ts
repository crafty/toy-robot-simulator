import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { Movement } from './movement.entity';
import { TrackMovementDto } from './dto/track-movement.dto';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(Movement)
    private readonly movementRepo: Repository<Movement>,
  ) {}

  async trackMovement(dto: TrackMovementDto): Promise<Movement> {
    const { sessionId, position } = dto;

    // Ensure session exists
    let session = await this.sessionRepo.findOne({
      where: { id: sessionId },
    });

    // If session does not exist, create it
    if (!session) {
      session = this.sessionRepo.create({ id: sessionId });
      await this.sessionRepo.save(session);
    }

    // Create and save movement for the session
    const movement = this.movementRepo.create({
      sessionId,
      x: position.x,
      y: position.y,
      heading: position.heading,
    });

    // return saved movement
    return this.movementRepo.save(movement);
  }

  async getLastMovementForSession(sessionId: string): Promise<Movement> {
    // Retrieve the most recent movement for the given session ID
    return this.movementRepo.findOne({
      where: { sessionId },
      order: { createdAt: 'DESC' },
    });
  }
}
