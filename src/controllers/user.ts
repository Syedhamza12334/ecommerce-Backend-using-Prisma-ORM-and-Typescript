import { Request, Response } from "express";
import { prismaClient } from "..";

import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { NotFound } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";
import { Address } from "@prisma/client";
import { BadRequestExceptions } from "../exceptions/badrequest";




export const addAddress = async (req: Request, res: Response) => {

AddressSchema.parse(req.body)



const addressess= await prismaClient.address.create({
    data:{
        ...req.body,
        userId:req.user.id
    },
 
})

res.json(addressess)
  
}



export const deleteAddress = async (req: Request, res: Response) => {

    try {

        await prismaClient.address.delete({
            where:{
                id: +req.params.id
            }
        })

        res.json({success:true})
        
    } catch (error) {
           throw new NotFound('address not found',ErrorCodes.USER_NOT_FOUND)
    }
  
}



export const listAddress = async (req: Request, res: Response) => {

    const count = await prismaClient.address.count()
    const addressess = await prismaClient.address.findMany({

where:{
    userId:req.user.id
}
       
    })
    res.json({
        count,
       data: addressess,
    })
}


export const updateUser = async (req: Request, res: Response) => {

    const validatedata=UpdateUserSchema.parse(req.body)

    let shippingAdress: Address;
    let billingAdress: Address;

    if (validatedata.defaultShippingAddressid){
    try {

        shippingAdress=await prismaClient.address.findFirstOrThrow({
            where:{
                id: validatedata.defaultShippingAddressid
            }
        })

    
        
    } catch (error) {
        throw new NotFound('address not found',ErrorCodes.USER_NOT_FOUND)
 }
 if (shippingAdress.userId !== req.user.id){
    throw new BadRequestExceptions("address does not belong to user",ErrorCodes.USER_NOT_FOUND)
}
}

if (validatedata.defaultBillingAddressid){
    try {

        billingAdress=await prismaClient.address.findFirstOrThrow({
            where:{
                id: validatedata.defaultBillingAddressid
            }
        })

    
        
    } catch (error) {
        throw new NotFound('address not found',ErrorCodes.USER_NOT_FOUND)
 }

 if (billingAdress.userId !== req.user.id){
    throw new BadRequestExceptions("address does not belong to user",ErrorCodes.USER_NOT_FOUND)
}

}


const updateuser= await prismaClient.user.update({
    where:{
        id: req.user.id
    },

    data:validatedata
})
res.json(updateuser)
}