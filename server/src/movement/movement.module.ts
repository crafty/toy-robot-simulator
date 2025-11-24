import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Movement } from './movement.entity';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Movement])],
  providers: [MovementService],
  controllers: [MovementController],
})
export class MovementModule {}
