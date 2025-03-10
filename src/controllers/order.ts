import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFound } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";

import { BadRequestExceptions } from "../exceptions/badrequest";



export const createOrder = async (req: Request, res: Response) => {

    return await prismaClient.$transaction(async(tx)=>{
        const cartitem=await prismaClient.cartItem.findMany({
            where:{
                userId:req.user.id
            },

            include:{
                product:true
            }

       
        })

// console.log('cartitem',cartitem);


        if (cartitem.length ==0){
            return res.json({message:'cart is empty '})
        }

        const price= cartitem.reduce((pre,cur)=>{
          return   pre +(cur.quantity * +cur.product.price)
        },0)

        const address=await tx.address.findFirst({
            where:{
                id:req.user.defaultShippingAddressid
            }
        })

        console.log('address',address);
        

        const order=await tx.order.create({
            data:{
                userId:req.user.id,
                netAmount:price,
                address:address.formattedAddress,
                products:{
                    create: cartitem.map((item)=>{
                        return{
                            productId:item.productId,
                            quantity:item.quantity
                        }
                    })
                }

            }
        })
    
        const orderEvent= await tx.orderEvent.create({
            data:{
                orderId:order.id
            }
        })
        await tx.cartItem.deleteMany({
            where:{
                userId:req.user.id
            }
        })
        return res.json(order)
    }

)



}

export const listOrder = async (req: Request, res: Response) => {

    const orders =await prismaClient.order.findMany({
        where:{
            userId:req.user.id
        }
    })

    res.json(orders)
}

export const cancelOrder = async (req: Request, res: Response) => {

    try {

        const order=await prismaClient.order.update({
            where:{
                id: +req.params.id
            },
          data:{
            status:'CANCELLED'
          }
        })
            
        await prismaClient.orderEvent.create({
            data:{
                orderId:order.id,
                status:'CANCELLED'
            }
        })

        res.json(order)
        } catch (error) {
                 throw new NotFound('cart order found',ErrorCodes.USER_NOT_FOUND)
        }
        

}

export const getOrderById = async (req: Request, res: Response) => {
try {

const order=await prismaClient.order.findFirstOrThrow({
    where:{
        id: +req.params.id
    },
    include:{
        products:true,
        events:true
    }
})
    
res.json(order)
} catch (error) {
         throw new NotFound(' order not found',ErrorCodes.USER_NOT_FOUND)
}

}

export const listAllOrders=async (req: Request, res: Response) => {

    let whereClause={}

    const status=req.query.status

    if (status){
        whereClause={
            status
        }
    }

    

    const orders=await prismaClient.order.findMany({
        where:whereClause,
        skip: +req.params.skip ||0,
        take:5
    })

    res.json(orders)
}

export const changeStatus=async (req: Request, res: Response) => {

    try {
       
        const order=await prismaClient.order.update({
           where:
           {
            id: +req.params.id
           },
          data:{
            status:req.body.status
          }
        })

        await prismaClient.orderEvent.create({
            data:{
                orderId:order.id,
                status:req.body.status
            }
        })



        res.json(order)
    } catch (error) {
        throw new NotFound('order not found',ErrorCodes.USER_NOT_FOUND)
    }

}

export const listUserOrders=async (req: Request, res: Response) => {


    let whereClause:any={
        userId: +req.params.id
    }

    const status=req.query.status

    if (status){
        whereClause={
            ...whereClause,
            status
        }
    }

    

    const orders=await prismaClient.order.findMany({
        where:whereClause,
        skip: +req.params.skip ||0,
        take:5
    })
    
        res.json(orders)


}


