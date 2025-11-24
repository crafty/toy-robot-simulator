import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementModule } from './movement/movement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.DB_PATH ||
        path.resolve(__dirname, '..', '..', 'data', 'dev.sqlite'), // Name of your SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entity files
      synchronize: true, // Auto-create schema (for development only) results in data loss when in production, should use migrations instead for prod
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    MovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
