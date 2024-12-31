import { Request,Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/roots";
import { AddressSchema, UpdateUserSchema } from "../schema/user";
import { Address, User } from "@prisma/client";
import { IGetUserAuthInfoRequest } from "../customs/customs";
import { BadRequestException } from "../exceptions/bad-request";

export const addAddress = async (req:IGetUserAuthInfoRequest,res:Response) => {
    AddressSchema.parse(req.body)
    const address = await prismaClient.address.create({data: {...req.body,userId: req.user?.id}})
    res.json(address)
}

export const deleteAddress = async  (req:IGetUserAuthInfoRequest,res:Response) => {
    try {
        await  prismaClient.address.delete({
             where: {
                 id: +req.params.id
             }
         })
         res.json({message:"address deleted succefully"})
     } catch (error) {
         throw new NotFoundException("address not found",ErrorCodes.ADDRESS_NOT_FOUND)
     }
}

export const listAddress = async(req:IGetUserAuthInfoRequest,res:Response) => {
    const address = await prismaClient.address.findMany({
     where: {
        userId: req.user?.id
     }
    })
    res.json({
        data:address
    })
}


export const updateUser = async(req:IGetUserAuthInfoRequest,res: Response) => {
    const validatedData = UpdateUserSchema.parse(req.body);
    let shippingAddress: Address;
    let billingAddress: Address;
    if(validatedData.defaultShippingAddress) {
        try {
            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: +validatedData.defaultShippingAddress
                }
            })
            if(shippingAddress.userId != req.user?.id) {
                throw new BadRequestException("Address does not belong to user",ErrorCodes.ADDRESS_DOES_NOT_BELONG)
            }
            } catch (error) {
                throw new NotFoundException("address not found",ErrorCodes.ADDRESS_NOT_FOUND)
            }
    }
    if(validatedData.defaultBillingAddress) {
        try {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: +validatedData.defaultBillingAddress
                }
            })
            if(billingAddress.userId != req.user?.id) {
                throw new BadRequestException("Address does not belong to user",ErrorCodes.ADDRESS_DOES_NOT_BELONG)
            }
            } catch (error) {
                throw new NotFoundException("address not found",ErrorCodes.ADDRESS_NOT_FOUND)
            }
    }
    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.user?.id
        },
        data: {
            ...req.body
        }
    })
    res.json(updatedUser)
}


export const changeUserRole =async (req:Request,res:Response) => {
    //add Validation
   try {
    const user = await prismaClient.user.update({where: {id: +req.params.id},data: {role: req.body.role}})
   } catch (error) {
    throw new NotFoundException("User not Found.",ErrorCodes.USER_NOT_FOUND)
   }
}

export const listUsers = async(req:IGetUserAuthInfoRequest, res: Response) => {
    const user = await prismaClient.user.findMany({
        skip: +req.query.skip! || 0,
        take: 5
    })
    res.json(user)
}

export const getUserById =async (req:IGetUserAuthInfoRequest, res: Response) => {
    try {
        const user = await prismaClient.user.findFirstOrThrow({where:{id: +req.params.id},include: {cartItems: true,addresses: true}})
        res.json(user)
    } catch (error) {
        throw new NotFoundException("User not Found.",ErrorCodes.USER_NOT_FOUND)
    }
}