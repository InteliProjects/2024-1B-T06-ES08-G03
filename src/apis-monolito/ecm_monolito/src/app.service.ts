import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async timeout(min: number, max: number) {
    return await new Promise((resolve, reject) => {
      setTimeout(
        () => {
          return resolve(null);
        },
        this.randomNumber(min, max),
      );
    });
  }

  async getHello(): Promise<object> {
    const receiveRequestDate = new Date();
    console.log(`[${receiveRequestDate.toISOString()}] Received a request`);

    const requestPort = 3017;
    const database = 'bd_relational';

    const sendToBDDate = new Date();
    console.log(
      `[${sendToBDDate.toISOString()}] Going to send a request to BD ${database} at ${requestPort}`,
    );

    const response = await axios({
      url: `http://localhost:${requestPort}`,
    });

    const receivedFromBDDate = new Date();
    console.log(
      `[${receivedFromBDDate.toISOString()}] Received response from BD ${database} at ${requestPort} port`,
    );

    const startProcessingDate = new Date();
    console.log(`[${startProcessingDate.toISOString()}] Start processing info`);

    await this.timeout(100, 200);

    const stopProcessingDate = new Date();
    console.log(`[${stopProcessingDate.toISOString()}] Ended processing info`);

    const bdTime = receivedFromBDDate.getTime() - sendToBDDate.getTime();

    const ecmProcessTime =
      stopProcessingDate.getTime() - startProcessingDate.getTime();

    const totalTime =
      stopProcessingDate.getTime() - receiveRequestDate.getTime();

    console.log(
      `=====================================\n FINAL LOGS:\n Time between bd info: ${bdTime}ms\n Time between processing info: ${ecmProcessTime}ms\n Total time: ${totalTime}ms\n Memory in BD: ${response.data?.memoryUsage?.usedMemoryPercentage}%\n=====================================`,
    );

    return {
      database,
      bdTime,
      ecmProcessTime,
      totalTime,
      bdResponse: response.data,
    };
  }
}
