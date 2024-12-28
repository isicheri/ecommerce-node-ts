import { ErrorCodes, HttpExceptions } from "./roots";

export class UnprocessableEntity extends HttpExceptions {
    constructor(message:string,errors: any, errorCode:ErrorCodes) {
        super(message,errorCode,422,errors)
    }
}