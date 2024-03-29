import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // starting time when request hits first 
    const start = Date.now();

    // than when response on than calculate duration and getting all the value from request object
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.url} ${res.statusCode} ${duration} ms`);
    });
    next();
  }
}