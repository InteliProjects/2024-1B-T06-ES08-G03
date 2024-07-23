import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports, Logger } from 'winston';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, message }) => `${timestamp} - ${message}`),
      ),
      transports: [new transports.File({ filename: 'access.log' })],
    });
  }
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const accessTime = new Date().toISOString();
    const route = req.originalUrl;

    const start = process.hrtime();

    res.on('finish', () => {
      const end = process.hrtime(start);
      const durationInMilliseconds = end[0] * 1000 + end[1] / 1e6;
      const statusCode = res.statusCode;
      this.logger.info(
        `IP: ${ip} - Browser: ${userAgent} - Access Time: ${accessTime} - Route: ${route} - Status ${statusCode} - Duration: ${durationInMilliseconds.toFixed(2)}ms`,
      );
    });

    next();
  }
}
