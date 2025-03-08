import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFound } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";
import { ChangeQuanitySchema, createCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";
import { BadRequestExceptions } from "../exceptions/badrequest";



export const addItemToCart = async (req: Request, res: Response) => {

    const  validatedata=createCartSchema.parse(req.body)
    let product:Product

    try {
        product=await prismaClient.product.findFirstOrThrow({
            where:{
                id:validatedata.productId
            }
        })
    } catch (error) {

        throw new NotFound('product not found', ErrorCodes.USER_NOT_FOUND)
        
    }

    const cart = await prismaClient.cartItem.create({
    data:{
        userId:req.user.id,
        productId:product.id,
        quantity:validatedata.quantity
    }

    }) 

    res.json(cart)

  
}

export const getCart = async (req: Request, res: Response) => {

  const cart = await prismaClient.cartItem.findMany({
    where:{
        userId:req.user.id
    },
    include:{
        product:true
    }
  })

  res.json(cart)
}


export const deleteItemToCart = async (req: Request, res: Response) => {

  
    try {


        let cart=await prismaClient.cartItem.findFirstOrThrow({
            where:{
                id:+req.params.id
            },
       
        })
    // console.log('cart',cart);
    // console.log('req.user.id',req.user.id);
    
    

         if (cart.userId !== req.user.id){
            throw new BadRequestExceptions("cart item does not belong to user",ErrorCodes.USER_NOT_FOUND)
        }
    
        const updatecart=await prismaClient.cartItem.delete({
            where:{
                id:+req.params.id
            },
       
        })
    
        res.json(updatecart)
        
       } catch (error) {
        
       throw new NotFound('cart item not found',ErrorCodes.USER_NOT_FOUND)
       }


}

export const changeQuantity = async (req: Request, res: Response) => {



    let cart=await prismaClient.cartItem.findFirstOrThrow({
        where:{
            id:+req.params.id
        },
   
    })
// console.log('cart',cart);
// console.log('req.user.id',req.user.id);



     if (cart.userId !== req.user.id){
        throw new BadRequestExceptions("cart item does not belong to user",ErrorCodes.USER_NOT_FOUND)
    }

    const validatedata = ChangeQuanitySchema.parse(req.body)
    const updatedcart = await prismaClient.cartItem.update({
        where:{
            id: +req.params.id
        },
        data:{
            quantity:validatedata.quantity
        }
    })

    res.json(updatedcart)
  
}
