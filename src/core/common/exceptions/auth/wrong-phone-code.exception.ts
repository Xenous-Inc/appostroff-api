import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class WrongPhoneCodeException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.WrongPhoneCode,
                message: 'Wrong phone code',
            },
            HttpStatus.FORBIDDEN,
        );
    }
}
