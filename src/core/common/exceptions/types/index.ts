import { HttpException, HttpStatus } from '@nestjs/common';

export enum AppostroffExceptionCode {
    AccessDenied = 600,
    WrongPhoneCode = 601,
    SessionNotFound = 602,
    InvalidToken = 603,
}
export interface IAppostroffExceptionResponse {
    code: AppostroffExceptionCode;
    message?: string | string[];
    error?: string;
}
export abstract class AppostroffException extends HttpException {
    constructor(res: IAppostroffExceptionResponse, status: HttpStatus) {
        super(res, status);
    }
}