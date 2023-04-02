import { HttpStatus } from '@nestjs/common';
import { AppostroffException, AppostroffExceptionCode } from '../types';

export class StoryNotFoundException extends AppostroffException {
    constructor() {
        super(
            {
                code: AppostroffExceptionCode.StoryNotFound,
                message: 'Story Not Found',
            },
            HttpStatus.NOT_FOUND,
        );
    }
}
