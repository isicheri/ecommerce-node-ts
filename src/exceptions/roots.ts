// message,statuscode,errorcodes

export class HttpExceptions extends Error {
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: any;

    constructor(message: string,errorCode:any,statusCode:number,errors:any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCodes {
USER_NOT_FOUND = 10001,
USER_ALREADY_EXIST = 10002,
INCORRECT_PASSWORD =10003,
UNPROCESABLE_ENTITY = 10004,
INTERNAL_EXCEPTION = 10005
}