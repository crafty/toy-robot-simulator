import { Entity, PrimaryColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Movement } from './movement.entity';

@Entity()
export class Session {
  @PrimaryColumn()
  id: string; // sessionId coming from the client, could be auto-generated server side when the user first places the robot

  @OneToMany(() => Movement, (movement) => movement.session)
  movements: Movement[];

  @CreateDateColumn()
  createdAt: Date;
}
