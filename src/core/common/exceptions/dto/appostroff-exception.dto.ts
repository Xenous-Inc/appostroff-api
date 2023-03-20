import { ApiProperty } from '@nestjs/swagger';
import { IAppostroffExceptionResponse, AppostroffExceptionCode } from '../types';

export class AppostroffExceptionDto implements IAppostroffExceptionResponse {
    @ApiProperty({
        description: 'Custom Error Code. See all their descriptions on Appostroff',
        enum: AppostroffExceptionCode,
        required: false,
    })
    code: AppostroffExceptionCode;

    @ApiProperty({ description: 'Error Message', required: false })
    message?: string | string[];

    @ApiProperty({ description: 'Error stack trace', required: false })
    error?: string;
}
