import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const { ip, baseUrl } = req;
            logger.info(`IP: ${ip} HTTP Route:${baseUrl}`);
        } catch (e) {
            logger.error(JSON.stringify(e));
        }
        next();
    }
}
