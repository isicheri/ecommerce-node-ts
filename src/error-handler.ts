import { NextFunction, Request,Response } from "express"
import { ErrorCodes, HttpExceptions } from "./exceptions/roots";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-request";


export const errorHandler = (method: Function) => {
  return async (req:Request,res:Response,next:NextFunction) => {
    try {
       await  method(req,res,next);
    } catch (error) {
        let exception: HttpExceptions;
        if(error instanceof HttpExceptions) {
          exception = error
        }else {
          if(error instanceof ZodError) {
            exception = new BadRequestException("Unprocessable Entity",ErrorCodes.UNPROCESABLE_ENTITY)
          }else {
            exception = new InternalException("something went wrong",error,ErrorCodes.INTERNAL_EXCEPTION)
          }
        }
        console.log(exception)
        next(exception)
    }
  }
}