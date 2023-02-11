import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.winston';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const { ip, baseUrl, headers } = req;
            const id = headers['x-request-id'] || uuidv4();
            logger.info(`IP: "${ip}", Route: "${baseUrl}", RequestId: "${id}"`);
        } catch (e) {
            logger.error(JSON.stringify(e));
        }
        next();
    }
}
