import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFound } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";



export const createProduct = async (req: Request, res: Response) => {

    // console.log('req.body', req.body);


    const product = await prismaClient.product.create({

        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {

   try {
    const product =req.body

    if (product.tags){
        product.tags=product.tags.join(',')
    }

    const updateproduct=await prismaClient.product.update({
        where:{
            id:+req.params.id
        },
        data:product
    })

    res.json(updateproduct)
    
   } catch (error) {
    
   throw new NotFound('product not found',ErrorCodes.USER_NOT_FOUND)
   }

}

export const deleteProduct = async (req: Request, res: Response) => {

    try {

    
        const updateproduct=await prismaClient.product.delete({
            where:{
                id:+req.params.id
            },
       
        })
    
        res.json(updateproduct)
        
       } catch (error) {
        
       throw new NotFound('product not found',ErrorCodes.USER_NOT_FOUND)
       }

}
export const listProduct = async (req: Request, res: Response) => {

    const count = await prismaClient.product.count()
    const products = await prismaClient.product.findMany({


        skip: +req.query.skip || 0,
        take:5
    })
    res.json({
        count,
       data: products,
    })


}


export const getProductById = async (req: Request, res: Response) => {

   try {

    const product=await prismaClient.product.findFirstOrThrow({
        where:{
            id:+req.params.id
        },
       
    })

    res.json(product)
    
   } catch (error) {
    throw new NotFound('product not found',ErrorCodes.USER_NOT_FOUND)
   }

}


