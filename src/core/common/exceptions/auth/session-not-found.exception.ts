import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class SessionNotFoundException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.SessionNotFound,
                message: 'Session not found',
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
