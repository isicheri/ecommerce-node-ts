import { ErrorCodes, HttpExceptions } from "./roots";

export class UnauthorizedException extends HttpExceptions{
    constructor(message:string,errorCode:ErrorCodes,error?: any) {
        super(message,errorCode,401,error);
    }
}