import { ErrorCodes, HttpExceptions } from "./roots";

export class InternalException extends HttpExceptions {
    constructor(message:string,errors:any,errorCode:ErrorCodes) {
        super(message,errorCode,500,errors)
    }
}