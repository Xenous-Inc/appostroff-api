import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class UserNotFoundException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.UserNotFound,
                message: 'Session not found',
            },
            HttpStatus.UNAUTHORIZED,
        );
    }
}
