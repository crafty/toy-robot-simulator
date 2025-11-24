import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Session } from './session.entity';
import { Heading } from './heading.enum';

@Entity()
export class Movement {
  @ApiProperty({
    example: 1,
    description: 'Auto-incremented ID of the movement event',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 0,
    description: 'X coordinate of the robot on the grid',
  })
  @Column()
  x: number;

  @ApiProperty({
    example: 0,
    description: 'Y coordinate of the robot on the grid',
  })
  @Column()
  y: number;

  @ApiProperty({
    example: Heading.NORTH,
    description: 'Heading direction of the robot',
  })
  @Column({
    type: 'text',
  })
  heading: Heading;

  // Foreign key column
  @ApiProperty({
    example: 'f81e7af3-fcf4-4cdd-b3a3-14a8087aa191',
    description:
      'Unique session ID generated client side using crypto.randomUUID()',
  })
  @Column()
  sessionId: string;

  @ManyToOne(() => Session, (session) => session.movements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sessionId' })
  session: Session;

  @ApiProperty({
    example: '2025-01-01T12:00:00.000Z',
    description: 'When this movement was recorded',
  })
  @CreateDateColumn()
  createdAt: Date;
}
