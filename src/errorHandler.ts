import { NextFunction, Request, Response } from "express"
import { ErrorCodes, HttpException } from "./exceptions/root"
import { InternalExceptions } from "./exceptions/internalexceptions"

export const errorHandler=(method:Function)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
         await   method(req,res,next)
        } catch (error:any) {
            let exceptions:HttpException
            if(error instanceof HttpException){
                exceptions=error
            }
            else{
                exceptions=new InternalExceptions('something wnet wrong',error,ErrorCodes.INTERNAL_EXCEPTIONS)
            }
            next(exceptions)
            
        }
    }
}