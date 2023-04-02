import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class RoleNotFoundException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.RoleNotFound,
                message: 'Role Not Found',
            },
            HttpStatus.NOT_FOUND,
        );
    }
}
