import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("/:scaleFactor")
  async getHello(@Param('scaleFactor') scaleFactor: number): Promise<object> {
    return this.appService.getHello(scaleFactor);

  }
}
