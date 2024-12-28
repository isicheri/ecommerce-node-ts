import { ErrorCodes, HttpExceptions } from "./roots";
    
    export class NotFoundException extends HttpExceptions{
        constructor(messsage:string, errorCode:ErrorCodes) {
            super(messsage,errorCode,404,null);
        }
    }
    