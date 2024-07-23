import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { client } from './prometheus.metrics';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<object> {
    return this.appService.getHello();
  }

  @Get('metrics')
  async getMetrics() {
    return client.register.metrics();
  }

  @Get('another-route')
  getAnotherRoute(): string {
    return 'This is another route!';
  }

}
