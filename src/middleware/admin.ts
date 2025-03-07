import { NextFunction, Request, Response } from "express";
import { UnAuthorizedExceptions } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";


const adminmiddelware=async(req: Request,res:Response,next:NextFunction)=>{
    

    const user=req.user

    if (user.role === 'ADMIN'){
        next()
    }
    else {
        next(new UnAuthorizedExceptions('Unauthorized',ErrorCodes.UN_AUTHOROZED))
    }
}

export default adminmiddelware