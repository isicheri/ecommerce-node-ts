import { NextFunction, Request,Response } from "express"
import { prismaClient } from "..";
import {compareSync, hashSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/roots";
import { UnprocessableEntity } from "../exceptions/validations";
import { SignUpSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import { IGetUserAuthInfoRequest } from "../customs/customs";

export const signup = async(req:Request,res:Response,next:NextFunction) => {
    SignUpSchema.parse(req.body)
    const {name,email,password} = req.body;
    let user = await prismaClient.user.findFirst({
        where: {email: email}
    });
    if(user) {
       new BadRequestException('user already exist',ErrorCodes.USER_ALREADY_EXIST);
    }
    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password,10)
        }
    })
    res.json(user)
}

export const login = async(req:Request,res:Response) => {
    const {email,password} = req.body;
    let user = await prismaClient.user.findFirst({
        where: {email: email}
    });
    if(!user) {
      throw new NotFoundException("User not found",ErrorCodes.USER_NOT_FOUND);
    }
    if(!compareSync(password,user.password)){
        throw new BadRequestException('Password incorrect',ErrorCodes.INCORRECT_PASSWORD)
    }
    let token = jwt.sign({userId: user?.id},JWT_SECRET)
    res.json({user,token})
}

export const me = (req: IGetUserAuthInfoRequest,res: Response,next: NextFunction) => {
    res.json(req.user)
}