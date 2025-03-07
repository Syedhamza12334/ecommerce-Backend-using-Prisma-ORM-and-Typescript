import { NextFunction, Request, Response } from "express"
import { ErrorCodes, HttpException } from "./exceptions/root"
import { InternalExceptions } from "./exceptions/internalexceptions"
import { ZodError } from "zod"

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

                if(error instanceof ZodError){
                    exceptions=new InternalExceptions('Inprocesssible entity',error,ErrorCodes.INPROCESSABLE_ENTITY)
                }
                else{
                    exceptions=new InternalExceptions('something went wrong',error,ErrorCodes.INTERNAL_EXCEPTIONS)
                }
            
            }
            next(exceptions)
            
        }
    }
}