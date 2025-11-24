import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthCheck')
  @ApiOperation({ summary: 'An endpoint to see if the app is running' })
  @ApiResponse({
    status: 200,
    description: 'Health check successful message',
    type: String,
  })
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
