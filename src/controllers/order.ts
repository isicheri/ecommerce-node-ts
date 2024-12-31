import { Request,Response } from "express"
import { prismaClient } from ".."
import { IGetUserAuthInfoRequest } from "../customs/customs"
import { User } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/roots";

export const createOrder = async (req:IGetUserAuthInfoRequest,res:Response) => {
     let user: User;
     user = await prismaClient.user.findFirstOrThrow({where: {id: req.user?.id}})
     // const convertedBillNo = parseInt(user.defaultShippingAddress)
     return await prismaClient.$transaction(async (tx) => {

     const cartItems = await prismaClient.cartItems.findMany({
          where: {userId: req.user?.id},
          include: {products: true}
     })
     if(cartItems.length == 0) {
          return res.json({message: "Cart is empty"})
     }  
     const price = cartItems.reduce((prev,current) => {
          return prev + (current.quantity * +current.products.price)
     },0)   
     const address = await tx.address.findFirst({where: {id: req.body.addressId}})
     const order = await tx.order.create({
          data: {
               userId: user.id,
               netAmount: price,
               address: address?.formattedAddress as string,
               products: {
                    create: cartItems.map((cart) => ({
                         product: { connect: { id: cart.productId } }, 
                         quantity: cart.quantity,
                     })),
               }
          }
     })
     const orderEvent = tx.orderEvent.create({
          data: {
               orderId: order.id
          }
     })
     await tx.cartItems.deleteMany({
          where: {
               userId: user.id
          }
     })
     res.json(order)
     })
}

export const listOrders = async(req:IGetUserAuthInfoRequest,res:Response) => {
     const orders = await prismaClient.order.findMany({
          where: {
               userId: req.user?.id
          }
     })
     res.json(orders)
}

export const cancelOrder =async (req:IGetUserAuthInfoRequest,res:Response) => {
     try {
          //add transactions
          const order = await prismaClient.order.update({
               where: {id: +req.params.id},
               data: {status: "CANCELLED"}
          })
          await prismaClient.orderEvent.create({
          data: {
               orderId: order.id,
               status: "CANCELLED"
          }
          })
          res.json(order)
     } catch (error) {
          throw new NotFoundException('Order Not Found',ErrorCodes.NOT_FOUND_EXCEPTION)
     }
}

export const getOrderById =async (req:Request,res:Response ) => {
     try {
          const order = await prismaClient.order.findFirstOrThrow({
               where: {id: +req.params.id},
               include: {products: true,events: true}
          })
          res.json(order)
     } catch (error) {
          throw new NotFoundException('Order Not Found',ErrorCodes.NOT_FOUND_EXCEPTION)
     }
}


export const listAllOrders = async(req:IGetUserAuthInfoRequest,res:Response) => {
     let whereClause = {}
     const status = req.query.status;
     if(status) {
          whereClause = {
               status
          }
     }
     const orders = await prismaClient.order.findMany({where: whereClause,skip: +req.params.skip || 0,take: 5})
     res.json(orders)
}

export const changeStatus =async(req:IGetUserAuthInfoRequest,res:Response) => {
     //wrapp in transaction
     try {
          const order = await prismaClient.order.update({
               where: {id: +req.params.id},
               data: {
                    status: req.body.status
               }
          })
          await prismaClient.orderEvent.create({
               data: {
                    orderId: order.id,
                    status: req.body.status
               }
          })
          res.json(order)
     } catch (error) {
          throw new NotFoundException('Order Not Found',ErrorCodes.NOT_FOUND_EXCEPTION)
     }
}


export const listUserOrder = async(req:IGetUserAuthInfoRequest,res:Response) => {
     let whereClause:any = {
          userId: +req.params.id,
          status: req.query.status
     }
     const status = whereClause.status;
     if(status) {
       whereClause.status = status;
     }
     const orders = await prismaClient.order.findMany({where:{ ...whereClause },skip: +req.params.skip || 0,take: 5})
     res.json(orders)
}
