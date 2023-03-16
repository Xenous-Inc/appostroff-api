import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DatabaseError } from 'sequelize';

@Catch(DatabaseError)
export class SequelizeExceptionFilter implements ExceptionFilter {
    catch(exception: DatabaseError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        console.log(exception); // Логирование ошибки

        response.status(500).json({
            statusCode: 500,
            message: 'Database error',
            error: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
            stackTrace: exception.stack,
        });
    }
}
