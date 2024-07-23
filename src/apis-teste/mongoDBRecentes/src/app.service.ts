import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class AppService {
  private getMemoryUsage() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    return {
      totalMemory,
      freeMemory,
      usedMemory,
      usedMemoryPercentage: (usedMemory / totalMemory) * 100,
    };
  }

  private async timeout(min: number, max: number, scaleFactor: number) {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, Math.floor(Math.random() * (max - min + 1)) * scaleFactor);
    });
  }

  async getHello(scaleFactor: number): Promise<object> {
    const startTimestamp = new Date();
    await this.timeout(200, 500, scaleFactor);
    const endTimestamp = new Date();

    return {
      consultTime: endTimestamp.getTime() - startTimestamp.getTime(),
      memoryUsage: this.getMemoryUsage(),
    };
  }
}