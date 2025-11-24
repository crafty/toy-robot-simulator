import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHealthCheck(): string {
    return 'Health Check Successful!';
  }

  getEnvironment(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  getDbPath(): string {
    return this.configService.get<string>('DB_PATH') || 'data/dev.sqlite';
  }

  isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }
}
