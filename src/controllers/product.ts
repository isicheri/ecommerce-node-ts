import { Request, Response } from "express";
import { prismaClient } from "..";
import { CreateProductSchema } from "../schema/product";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/roots";


export const createProduct = async(req:Request,res: Response) => {
//create validator for this
CreateProductSchema.parse(req.body)
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    res.json(product)
}

export const updateProduct = async(req:Request,res: Response) => {
    try {
        const product = req.body;
        if(product.tags) {
            product.tags = product.tags.join(',')
        }
        const updatedProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        })
        res.json(updatedProduct)
    } catch (error) {
        throw new NotFoundException("product not found",ErrorCodes.NOT_FOUND_EXCEPTION)
    }
}

export const deleteProduct = async(req:Request,res: Response) => {
    try {
       await  prismaClient.product.delete({
            where: {
                id: +req.params.id
            }
        })
        res.json({message: "product deleted succefully"})
    } catch (error) {
        throw new NotFoundException("product not found",ErrorCodes.NOT_FOUND_EXCEPTION)
    }
}

export const listProducts = async(req:Request,res: Response) => {
const count = await prismaClient.product.count();
const products = await prismaClient.product.findMany({
    skip: +req.query.skip! || 0,
    take: 5
})
res.json({
    count,data:products
})
}

export const getProductById = async(req:Request,res: Response) => {
    try {
       const product = await prismaClient.product.findFirstOrThrow({
        where: {
            id: +req.params.id
        }
       }) 
       res.json(product)
    } catch (error) {
        throw new NotFoundException("product not found",ErrorCodes.NOT_FOUND_EXCEPTION)
    }
}


//the fulltext search is not yet fullu functional
export const searchProduct =async(req:Request,res:Response) => {
    const products = await prismaClient.product.findMany({
        where: {
            name: {
                contains: req.query.q?.toString()
            },
            description: {
                contains: req.query.q?.toString()
            },
            tags: {
                contains: req.query.q?.toString()
            }
        }
    })
    res.json(products)
}