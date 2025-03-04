import {NextFunction, Request,Response} from "express"
import { prismaClient } from ".."
import {compareSync, hashSync} from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SCERET } from "../secrets"
import { BadRequestExceptions } from "../exceptions/badrequest"
import { ErrorCodes } from "../exceptions/root"
import { unprocessableEntity } from "../exceptions/validation"
import { SignupSchema } from "../schema/users"

export const Signup=async(req:Request,res:Response,next:NextFunction)=>{


    SignupSchema.parse(req.body)
    const {name,email,password}=req.body

    let user =await prismaClient.user.findFirst({where:{email}})
 
 
    if (user){
     // throw Error("user already exsists")
   new BadRequestExceptions('user already exsists',ErrorCodes.USER_ALREDAY_EXSITS)
    }
 
 
    user=await prismaClient.user.create({
     data:{
         name,
         email,
         password:hashSync(password,18)
     }
 
  
    })
    res.json(user)
}


export const Signin=async(req:Request,res:Response)=>{


    const {email,password}=req.body
 
    let user =await prismaClient.user.findFirst({where:{email}})
 
 
    if (!user){
      throw Error("user not found ")
    // new BadRequestExceptions('user not found',ErrorCodes.USER_NOT_FOUND)
    }
 
    console.log('user',user);
    


    if (!compareSync(password,user.password))

{
    throw Error("Incorrect password")    
    
}   

const token =jwt.sign({
    userId:user.id
},JWT_SCERET)



res.json({user,token})
 }