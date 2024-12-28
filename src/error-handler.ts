import { NextFunction, Request,Response } from "express"
import { HttpExceptions } from "./exceptions/roots";


export const errorHandler = (method: Function) => {
  return (req:Request,res:Response,next:NextFunction) => {
    try {
        method(req,res,next);
    } catch (error) {
        let exceptions: HttpExceptions;
        if(error instanceof HttpExceptions) {
          exceptions = error
        }else {
         
        }
    }
  }
}