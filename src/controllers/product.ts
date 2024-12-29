import { Request, Response } from "express";
import { prismaClient } from "..";
import { CreateProductSchema } from "../schema/product";


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
    
}

export const deleteProduct = async(req:Request,res: Response) => {}

export const listProducts = async(req:Request,res: Response) => {}

export const getProductById = async(req:Request,res: Response) => {}