// movement.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MovementController } from './movement.controller';
import { MovementService } from './movement.service';
import { NotFoundException } from '@nestjs/common';
import { Heading } from './heading.enum';

describe('MovementController', () => {
  let controller: MovementController;
  let service: MovementService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementController],
      providers: [
        {
          provide: MovementService,
          useValue: {
            trackMovement: jest.fn(),
            getLastMovementForSession: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(MovementController);
    service = module.get(MovementService);
  });

  describe('trackMovement', () => {
    it('should save a movement', async () => {
      const dto = {
        sessionId: 'f81e7af3-fcf4-4cdd-b3a3-14a8087aa191',
        position: { x: 1, y: 2, heading: Heading.NORTH },
      };

      const savedMovement = {
        id: 1,
        sessionId: dto.sessionId,
        x: 1,
        y: 2,
        heading: Heading.NORTH,
      };

      (service.trackMovement as jest.Mock).mockResolvedValue(savedMovement);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await expect(controller.trackMovement(dto as any)).resolves.toEqual(
        savedMovement,
      );
    });
  });

  describe('getLast', () => {
    it('should return the last movement', async () => {
      const movement = { x: 0, y: 0, heading: Heading.NORTH };

      (service.getLastMovementForSession as jest.Mock).mockResolvedValue(
        movement,
      );

      await expect(
        controller.getLast('f81e7af3-fcf4-4cdd-b3a3-14a8087aa191'),
      ).resolves.toEqual(movement);
    });

    it('should throw NotFoundException when there are no movements', async () => {
      (service.getLastMovementForSession as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.getLast('5555555-5555-5555-5555-55555555555'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
