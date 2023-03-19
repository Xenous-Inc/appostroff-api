import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class ServiceUnavailableException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.ServiceUnavailable,
                message: 'Session not found',
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
