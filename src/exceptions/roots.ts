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
        // console.log(errors)
    }
}

export enum ErrorCodes {
USER_NOT_FOUND = 10001,
USER_ALREADY_EXIST = 10002,
INCORRECT_PASSWORD =10003,
UNPROCESABLE_ENTITY = 10004,
INTERNAL_EXCEPTION = 10005,
NOT_FOUND_EXCEPTION = 10006,
UNAUTHORIZED_EXCEPTION = 10007,
ADDRESS_NOT_FOUND = 10008,
ADDRESS_DOES_NOT_BELONG = 10010
}