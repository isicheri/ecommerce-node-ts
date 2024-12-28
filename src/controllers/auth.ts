import { NextFunction, Request,Response } from "express"
import { prismaClient } from "..";
import {compareSync, hashSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/roots";
import { UnprocessableEntity } from "../exceptions/validations";
import { SignUpSchema } from "../schema/user";

export const signup = async(req:Request,res:Response,next:NextFunction) => {
    try {
        SignUpSchema.parse(req.body)
        const {name,email,password} = req.body;
        let user = await prismaClient.user.findFirst({
            where: {email: email}
        });
        if(user) {
           next(new BadRequestException('user already exist',ErrorCodes.USER_ALREADY_EXIST))
        }
        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password,10)
            }
        })
        res.json(user)
    } catch (error:any) {
        next(new UnprocessableEntity('Unprocessable entity',error?.issues,ErrorCodes.UNPROCESABLE_ENTITY))
    }
}

export const login = async(req:Request,res:Response) => {
    const {email,password} = req.body;
    let user = await prismaClient.user.findFirst({
        where: {email: email}
    });
    if(!user) {
        throw Error("user does not exist")
    }
    if(!compareSync(password,user.password)){
        throw Error("password incorrect")
    }
    let token = jwt.sign({userId: user.id},JWT_SECRET)
    res.json({user,token})
}