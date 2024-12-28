import { NextFunction, Request, Response } from "express";
import { HttpExceptions } from "../exceptions/roots";

export const errorMiddleware = (error:HttpExceptions,req:Request,res:Response,next:NextFunction) => {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}