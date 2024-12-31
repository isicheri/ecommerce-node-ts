import { NextFunction, Request,Response } from "express";
import { AddToCartSchema, ChangeQuantitySchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/roots";
import { Product, User, CartItems } from "@prisma/client";
import { prismaClient } from "..";
import { IGetUserAuthInfoRequest } from "../customs/customs";
import { BadRequestException } from "../exceptions/bad-request";


export const addItemToCart = async (req:IGetUserAuthInfoRequest,res:Response,next:NextFunction) => {
    // check for the existenc of product in users cart
    const validatedData = AddToCartSchema.parse(req.body)
    let product: Product;
    let user: User;
    user = await prismaClient.user.findFirstOrThrow({
        where: {
            id: req.user?.id
        },include: {cartItems: true}
    })
        try {
            product = await prismaClient.product.findFirstOrThrow({
                where: {
                    id: validatedData.productId
                }
            })
    
        } catch (error) {
            throw new NotFoundException("product not found",ErrorCodes.NOT_FOUND_EXCEPTION)
        }
   
    const cart = await prismaClient.cartItems.create({
        data: {
            productId: product.id,
            quantity: validatedData.quantity,
            userId: user.id
        }
    })
  return  res.json({cart,user})
}

export const deleteItemFromCart = async (req:IGetUserAuthInfoRequest,res:Response) => {
    const cart = await prismaClient.cartItems.findFirstOrThrow({where: {userId: req.user?.id}})
    if(cart) {
        await prismaClient.cartItems.delete({
            where: {
                id: +req.params.id
            }
        })
        res.json({success: true})
    }else {
        throw new BadRequestException('cart does not belong to User',ErrorCodes.USER_NOT_FOUND);
    }
}

export const changeQuantity = async (req:IGetUserAuthInfoRequest,res:Response) => {
    const cart = await prismaClient.cartItems.findFirstOrThrow({where: {userId: req.user?.id}})
    const validatedData = ChangeQuantitySchema.parse(req.body)
    if(cart) {
        const updatedCart = await prismaClient.cartItems.update({
            where: {id: +req.params.id},
            data: {quantity: validatedData.quantity}
        })
        res.json(updatedCart)
    }else {
        throw new BadRequestException('cart does not belong to User',ErrorCodes.USER_NOT_FOUND);
    }
 
}

export const getCart = async (req:IGetUserAuthInfoRequest,res:Response) => {
    const cart = await prismaClient.cartItems.findMany({
        where: {userId: req.user?.id},
        include: {products: true}
    })
}