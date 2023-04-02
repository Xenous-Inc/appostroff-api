import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class InvalidTokenException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.InvalidToken,
                message: 'Token invalid',
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
