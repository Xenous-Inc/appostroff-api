import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class AccessDeniedException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.AccessDenied,
                message: 'Access denied',
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
