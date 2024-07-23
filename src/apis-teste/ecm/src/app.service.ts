import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { httpRequestCounter, httpRequestDurationMicroseconds } from './prometheus.metrics';
import { GlobalState } from '@ecm/globalState';

@Injectable()
export class AppService {
  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async timeout(min: number, max: number) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, this.randomNumber(min, max));
    });
  }

  async getHello(): Promise<object> {
    const receiveRequestDate = new Date();
    const end = httpRequestDurationMicroseconds.startTimer();
    httpRequestCounter.inc({ method: 'GET', route: '/', status_code: 200 });

    console.log(`[${receiveRequestDate.toISOString()}] Received a Request`);

    const mongoDBport =  {
      filed: 3003,
      intermediate: 3002,
      recent: 3001
    };

    const number = this.randomNumber(1, 10);

    let requestPort = null;
    let database = '';

    if(number <= 7) {
      requestPort = mongoDBport.recent;
      database = 'Recent';
    } else if(number == 10) {
      requestPort = mongoDBport.filed;
      database = 'Filed';
    } else {
      requestPort = mongoDBport.intermediate;
      database = 'Intermediate';
    }

    const data_base_lower_case = database.toLowerCase();

    const sendToBDDate = new Date();
    console.log(`[${sendToBDDate.toISOString()}] Going to send a request to BD ${database} at ${requestPort} port`);

    const scaleFactor = GlobalState.getInstance().getScaleFactor();
    console.log(`Scale Factor: ${scaleFactor}`);
    const response = await axios({
      url: `http://${data_base_lower_case}:${requestPort}/${scaleFactor}`
    });

    const receivedFromBDDate = new Date();
    console.log(`[${receivedFromBDDate.toISOString()}] Received response from BD ${database} at ${requestPort} port`);

    const startProcessingDate = new Date();
    console.log(`[${startProcessingDate.toISOString()}] Start processing info`);

    await this.timeout(100, 200);

    const stopProcessingDate = new Date();
    console.log(`[${stopProcessingDate.toISOString()}] Ended processing info`);

    const bdTime = receivedFromBDDate.getTime() - sendToBDDate.getTime();
    const ecmProcessTime = stopProcessingDate.getTime() - startProcessingDate.getTime();
    const totalTime = stopProcessingDate.getTime() - receiveRequestDate.getTime();

    console.log(`=====================================\n FINAL LOGS:\n Time between bd info: ${bdTime}ms\n Time between processing info: ${ecmProcessTime}ms\n Total time: ${totalTime}ms\n Memory in BD: ${response.data?.memoryUsage?.usedMemoryPercentage}%\n=====================================`)

    return {
      database,
      bdTime,
      ecmProcessTime,
      totalTime,
      bdResponse: response.data
    };
  }
}

