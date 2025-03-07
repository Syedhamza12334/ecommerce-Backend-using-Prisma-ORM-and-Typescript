import { NextFunction, Request, Response } from "express";
import { UnAuthorizedExceptions } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken"
import { JWT_SCERET } from "../secrets";
import { prismaClient } from "..";

const authmiddelware=async(req: Request,res:Response,next:NextFunction)=>{
    // const token=req.headers.authorization
    const token: string = req.headers.authorization as string;

    if (!token){
        next (new UnAuthorizedExceptions('unauthorized',ErrorCodes.UN_AUTHOROZED))
    }

    try {
        

        const payload= jwt.verify(token,JWT_SCERET)as any


        const user= await prismaClient.user.findFirst({where:{id:payload.userId}})

        if (!user){
            next (new UnAuthorizedExceptions('unauthorized',ErrorCodes.UN_AUTHOROZED))
        }
        req.user = user
        next()
    } catch (error) {
        next (new UnAuthorizedExceptions('unauthorized',ErrorCodes.UN_AUTHOROZED))
    }
}

export default authmiddelware