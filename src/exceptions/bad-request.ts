import { ErrorCodes, HttpExceptions } from "./roots";

export class BadRequestException extends HttpExceptions{
    constructor(messsage:string, errorCode:ErrorCodes) {
        super(messsage,errorCode,400,null);
    }
}
